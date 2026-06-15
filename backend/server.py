# server.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
import asyncio

# Import the modules you just built and verified!
from fixation_detector import FixationDetector
from word_tracker import WordTracker
from intervention import InterventionEngine

app = FastAPI(title="ZyraLex Backend Engine")

# Enable CORS so your frontend application can talk to this server seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instantiate the engines
detector = FixationDetector(spatial_threshold=100, temporal_threshold=0.1)
tracker = WordTracker(distraction_threshold=3.0, fixation_threshold=1.0)
tracker.load_text_coordinates([
    {
        "word": "dyslexia",
        "x1": 0,
        "y1": 0,
        "x2": 1920,
        "y2": 1080
    }
])
intervention = InterventionEngine()

@app.get("/")
def root():
    return {"status": "online", "project": "ZyraLex Engine"}

@app.websocket("/ws/stream")
async def gaze_stream_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Frontend/Webcam client connected to ZyraLex Socket Loop.")
    
    try:
        while True:
            # 1. Receive JSON packet frame from the gaze source
            raw_data = await websocket.receive_text()
            # raw_data = await websocket.receive_text()
            print("RAW DATA:", raw_data)
            packet = json.loads(raw_data)
            print("PACKET:", packet)
            # Format expected from client:
            # {
            #   "raw_x": 420, "raw_y": 310, "face_detected": true,
            #   "screen_words": [{"word": "dyslexia", "x1": 400, "y1": 300, "x2": 510, "y2": 340}]
            # }
            
            face_detected = packet.get("face_detected", True)
            raw_x = packet.get("raw_x", 0)
            raw_y = packet.get("raw_y", 0)
            
            # If the layout text maps update dynamically, reload them
            if "screen_words" in packet:
                tracker.load_text_coordinates(packet["screen_words"])
            
            # 2. Process Distraction & Fixation checks
            # Call your WordTracker directly for immediate distraction monitoring
            status_update = tracker.update_gaze(raw_x, raw_y, face_detected=face_detected)
            print("TRACKER RESULT:", status_update)
            if status_update and status_update["status"] == "distracted":
                # User is looking away; send an alert payload immediately
                print("INTERVENTION TRIGGERED")
                print(response_payload)
                await websocket.send_text(json.dumps({
                    "type": "DISTRACTION_ALERT",
                    "payload": status_update
                }))
                continue
                
            # 3. If a face is present, pass the raw data point through the spatial filter
            if face_detected:
                is_fixating, cx, cy, duration = detector.process_point(raw_x, raw_y)
                print(
                "FIXATION:",
                is_fixating,
                cx,
                cy,
                duration
                )
                if is_fixating:
                    # Let the tracker map the refined fixation coordinate to a word block
                    fixation_match = tracker.update_gaze(cx, cy, face_detected=True)
                    
                    if fixation_match and fixation_match["status"] == "fixated":
                        target_word = fixation_match["word"]
                        
                        # 4. Generate dynamic adaptations via InterventionEngine
                        syllable_hyphen = intervention.format_syllable_breakdown(target_word, style="hyphen")
                        syllable_html = intervention.format_syllable_breakdown(target_word, style="color")
                        audio_payload = intervention.trigger_audio_cue(target_word)
                        
                        # Assemble complete intervention dispatch
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
                        
                        print(f"Sending assistance layout for word: '{target_word}'")
                        await websocket.send_text(json.dumps(response_payload))
                        
    except WebSocketDisconnect:
        print("Client disconnected from ZyraLex Socket Loop.")
    except Exception as e:
        print(f"Runtime error inside server framework loop: {e}")

if __name__ == "__main__":
    import uvicorn
    # Start server locally on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)