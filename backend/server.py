from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn
from typing import List

from fixation_detector import FixationDetector
from word_tracker import WordTracker
from intervention import InterventionEngine
import base64
import io
import re

import pytesseract
from fastapi import UploadFile, File
from PIL import Image
from pydantic import BaseModel

app = FastAPI(title="ZyraLex Dual-Stream Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

detector = FixationDetector(spatial_threshold=100, temporal_threshold=0.1)
tracker = WordTracker(distraction_threshold=3.0, fixation_threshold=6.5)
intervention = InterventionEngine()

camera_connections: List[WebSocket] = []
app_connections: List[WebSocket] = []

async def broadcast_to_apps(message_dict: dict):
    payload = json.dumps(message_dict)
    for app_socket in app_connections:
        try:
            await app_socket.send_text(payload)
        except Exception:
            pass

@app.get("/")
def root():
    return {"status": "online", "project": "ZyraLex Engine Hub"}

@app.websocket("/ws/app")
async def app_endpoint(websocket: WebSocket):
    await websocket.accept()
    app_connections.append(websocket)
    print(f"Mobile App client synced up. Total Active Apps: {len(app_connections)}")
    
    try:
        while True:
            raw_data = await websocket.receive_text()
            packet = json.loads(raw_data)
            
            if "screen_words" in packet and packet["screen_words"]:
                print(f"App updated layout coordinates: {len(packet['screen_words'])} words.")
                tracker.load_text_coordinates(packet["screen_words"])
                
    except WebSocketDisconnect:
        print("Mobile App disconnected.")
    finally:
        if websocket in app_connections:
            app_connections.remove(websocket)

@app.websocket("/ws/camera")
async def camera_endpoint(websocket: WebSocket):
    await websocket.accept()
    camera_connections.append(websocket)
    print("Camera Eye-Tracker Connected to Pipeline Stream!")
    
    try:
        while True:
            raw_data = await websocket.receive_text()
            packet = json.loads(raw_data)
            
            face_detected = packet.get("face_detected", True)
            raw_x = packet.get("raw_x", 0)
            raw_y = packet.get("raw_y", 0)
            
            if not face_detected:
                status_update = tracker.update_gaze(raw_x, raw_y, face_detected=False)
                if status_update and status_update["status"] == "distracted":
                    await broadcast_to_apps({
                        "type": "DISTRACTION_ALERT",
                        "payload": {
                            "message":{"message":status_update.get("sel_message", "Hey! Let's get back to it 😊")}
                        }
                    })
                continue
            
            # Update gaze and check for fixation
            tracker.update_gaze(raw_x, raw_y, face_detected=True)
            is_fixating, cx, cy, duration = detector.process_point(raw_x, raw_y)
            
            if is_fixating:
                fixation_match = tracker.update_gaze(cx, cy, face_detected=True)
                
                if fixation_match:
                    status = fixation_match.get("status")
                    target_word = fixation_match.get("word", "")
                    
                    if status == "fixated":
                        await broadcast_to_apps({
                            "type": "INTERVENTION_TRIGGER",
                            "word": target_word,
                            "fixation_duration": round(duration, 2),
                            "sel_message": fixation_match.get("sel_message", ""),
                            "adaptations": {
                                "hyphenated": fixation_match.get("syllables", target_word),
                                "html_colored": intervention.format_syllable_breakdown(target_word, style="color")
                            }
                        })
                        
                    elif status == "struggling":
                        await broadcast_to_apps({
                            "type": "FRUSTRATION_ALERT",
                            "word": target_word,
                            "sel_message": fixation_match.get("sel_message", "This is tough — and you're still trying. That's amazing! 🌟"),
                        })
                        
    except WebSocketDisconnect:
        print("Camera client dropped connection pipeline loop.")
    finally:
        if websocket in camera_connections:
            camera_connections.remove(websocket)

@app.post("/api/tracking/start")
async def start_tracking():
    return {
        "status": "tracking_started"
    }

@app.post("/api/mood")
async def receive_mood(data: dict):
    mood = data.get("mood")
    return {
        "received": True,
        "adapted_tone": mood
    }


class SyllableRequest(BaseModel):
    word: str


@app.post("/api/syllables")
async def get_syllables(req: SyllableRequest):
    word = re.sub(r"[^a-zA-Z]", "", req.word).lower()
    if not word:
        return {"word": req.word, "syllables": [], "error": "empty word"}

    hyphenated = intervention.format_syllable_breakdown(word, style="hyphen")
    syllables = hyphenated.split("-")

    return {"word": word, "syllables": syllables}


@app.post("/api/ocr")
async def scan_flashcard(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("L")

    raw_text = pytesseract.image_to_string(image)
    matches = re.findall(r"[A-Za-z]+", raw_text)

    candidates = [w for w in matches if len(w) >= 3]
    word = max(candidates, key=len) if candidates else (matches[0] if matches else "")

    return {"raw_text": raw_text.strip(), "word": word}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)