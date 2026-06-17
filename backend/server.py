# backend/server.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn
from typing import List

# Import your core engines
from fixation_detector import FixationDetector
from word_tracker import WordTracker
from intervention import InterventionEngine

app = FastAPI(title="ZyraLex Backend Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Core Engines
detector = FixationDetector(spatial_threshold=100, temporal_threshold=0.1)
tracker = WordTracker(distraction_threshold=3.0, fixation_threshold=1.0)
intervention = InterventionEngine()

# --- CONNECTION MANAGER FOR BROADCASTING ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f" New client connected. Total clients: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f" Client disconnected. Total clients: {len(self.active_connections)}")

    async def broadcast(self, message: str):
        # Sends data frames to ALL connected clients (Camera, Expo, etc.)
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                # Handle dead connections gracefully
                pass

manager = ConnectionManager()

@app.get("/")
def root():
    return {"status": "online", "project": "ZyraLex Engine"}

@app.websocket("/ws/stream")
async def gaze_stream_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    
    try:
        while True:
            raw_data = await websocket.receive_text()
            packet = json.loads(raw_data)
            
            # 1. Check if this is a configuration packet from the Frontend UI mapping screen coordinates
            if "screen_words" in packet and packet["screen_words"]:
                print("Updating text target coordinate bounds from Frontend")
                tracker.load_text_coordinates(packet["screen_words"])
                # No tracking metrics to process in layout initialization frames, skip processing
                if "raw_x" not in packet:
                    continue

            # 2. Extract telemetry coordinates from camera stream packet
            face_detected = packet.get("face_detected", True)
            raw_x = packet.get("raw_x", 0)
            raw_y = packet.get("raw_y", 0)
            
            # 3. Process Distraction engines
            status_update = tracker.update_gaze(raw_x, raw_y, face_detected=face_detected)
            
            if status_update and status_update["status"] == "distracted":
                print("INTERVENTION TRIGGERED: Distraction Alert")
                await manager.broadcast(json.dumps({
                    "type": "DISTRACTION_ALERT",
                    "payload": status_update
                }))
                continue
                
            # 4. If face target is solid, calculate spatial layout fixations
            if face_detected:
                is_fixating, cx, cy, duration = detector.process_point(raw_x, raw_y)
                
                if is_fixating:
                    fixation_match = tracker.update_gaze(cx, cy, face_detected=True)
                    
                    if fixation_match and fixation_match["status"] == "fixated":
                        target_word = fixation_match["word"]
                        
                        # Generate syllable breakdown models via InterventionEngine
                        syllable_hyphen = intervention.format_syllable_breakdown(target_word, style="hyphen")
                        syllable_html = intervention.format_syllable_breakdown(target_word, style="color")
                        audio_payload = intervention.trigger_audio_cue(target_word)
                        
                        response_payload = {
                            "type": "INTERVENTION_TRIGGER",
                            "word": target_word,
                            "fixation_duration": round(duration, 2),
                            "adaptations": {
                                "hyphenated": syllable_hyphen,
                                "html_colored": syllable_html,
                                "audio_cue": audio_payload
                            }
                        }
                        
                        print(f"Broadcasting assistance breakdown for word: '{target_word}'")
                        await manager.broadcast(json.dumps(response_payload))
                        
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"Error in Server Framework Loop: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)