# backend/server.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn
from typing import List

from fixation_detector import FixationDetector
from word_tracker import WordTracker
from intervention import InterventionEngine

app = FastAPI(title="ZyraLex Dual-Stream Hub")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate engines
detector = FixationDetector(spatial_threshold=100, temporal_threshold=0.1)
tracker = WordTracker(distraction_threshold=3.0, fixation_threshold=1.0)
intervention = InterventionEngine()

# Dedicated client storage lists
camera_connections: List[WebSocket] = []
app_connections: List[WebSocket] = []

async def broadcast_to_apps(message_dict: dict):
    """Safely broadcasts calculated metrics directly to the mobile apps."""
    payload = json.dumps(message_dict)
    for app_socket in app_connections:
        try:
            await app_socket.send_text(payload)
        except Exception:
            pass

@app.get("/")
def root():
    return {"status": "online", "project": "ZyraLex Engine Hub"}

# --- 1. DEDICATED APP HANDSHAKE ENDPOINT ---
@app.websocket("/ws/app")
async def app_endpoint(websocket: WebSocket):
    await websocket.accept()
    app_connections.append(websocket)
    print(f"Mobile App client synced up. Total Active Apps: {len(app_connections)}")
    
    try:
        while True:
            # Listen to text coordinate updates from frontend
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

# --- 2. DEDICATED CAMERA EYE STREAM ENDPOINT ---
@app.websocket("/ws/camera")
async def camera_endpoint(websocket: WebSocket):
    await websocket.accept()
    camera_connections.append(websocket)
    print(" Camera Eye-Tracker Connected to Pipeline Stream!")
    
    try:
        while True:
            raw_data = await websocket.receive_text()
            packet = json.loads(raw_data)
            
            face_detected = packet.get("face_detected", True)
            raw_x = packet.get("raw_x", 0)
            raw_y = packet.get("raw_y", 0)
            
            # Compute Distraction
            status_update = tracker.update_gaze(raw_x, raw_y, face_detected=face_detected)
            if status_update and status_update["status"] == "distracted":
                print("INTERVENTION: Distraction Dispatched")
                await broadcast_to_apps({
                    "type": "DISTRACTION_ALERT",
                    "payload": status_update
                })
                continue
            
            # Compute Fixation
            if face_detected:
                is_fixating, cx, cy, duration = detector.process_point(raw_x, raw_y)
                
                if is_fixating:
                    fixation_match = tracker.update_gaze(cx, cy, face_detected=True)
                    
                    if fixation_match and fixation_match["status"] == "fixated":
                        target_word = fixation_match["word"]
                        
                        response_payload = {
                            "type": "INTERVENTION_TRIGGER",
                            "word": target_word,
                            "fixation_duration": round(duration, 2),
                            "adaptations": {
                                "hyphenated": intervention.format_syllable_breakdown(target_word, style="hyphen"),
                                "html_colored": intervention.format_syllable_breakdown(target_word, style="color")
                            }
                        }
                        print(f"Fixation on '{target_word}'. Broadcasting layout...")
                        await broadcast_to_apps(response_payload)
                        
    except WebSocketDisconnect:
        print("Camera client dropped connection pipeline loop.")
    finally:
        if websocket in camera_connections:
            camera_connections.remove(websocket)
          if fixation_match["status"] == "struggling":
            await broadcast_to_apps({
            "type": "FRUSTRATION_ALERT",
            "word": target_word,
            "message": "It's okay to find this hard. Let's try together."
        })
        await broadcast_to_apps({
            "type": "ENCOURAGEMENT_PUSH",
            "message": "You just read that whole section!",
            "stars_earned": 1
    })
    @app.post("/api/mood")
    async def receive_mood(data: dict):
    # store to students.csv or DB
    # adjust intervention tone based on mood
    mood = data.get("mood")  # "happy", "tired", "frustrated", "okay"
    return {"received": True, "adapted_tone": mood}
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)