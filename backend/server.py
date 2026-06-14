from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from word_tracker import WordTracker
app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("dyslexia_model.pkl")
tracker = WordTracker(distraction_threshold=3.0, fixation_threshold=2.0)

# Simulate UI layout data sent from frontend when reading material loads
mock_screen_words = [
    {"word": "The", "x1": 50, "y1": 100, "x2": 90, "y2": 130},
    {"word": "dyslexia", "x1": 100, "y1": 100, "x2": 210, "y2": 130},
    {"word": "model", "x1": 220, "y1": 100, "x2": 300, "y2": 130},
]
tracker.load_text_coordinates(mock_screen_words)

# Inside your frame processing loop:
# 1. Get face/eye statuses and coordinate guesses from gaze_detection.py
face_found, screen_gaze_x, screen_gaze_y = detect_gaze_coordinates(frame) 

# 2. Feed it into your tracker
action = tracker.update_gaze(screen_gaze_x, screen_gaze_y, face_detected=face_found)
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        
        # Coerce types explicitly to eliminate serialization errors
        score = int(data["score"])
        mistakes = int(data["mistakes"])
        reading_speed = int(data["reading_speed"])

        print("\n📥 --- INCOMING METRICS REGISTERED ---")
        print(f"Score: {score}/10 | Mistakes: {mistakes} | Time Elapsed: {reading_speed}s")

        # Create DataFrame with exact feature names
        input_data = pd.DataFrame([{
            "score": score,
            "mistakes": mistakes,
            "reading_speed": reading_speed
        }])

        prediction = model.predict(input_data)
        assigned_level = str(prediction[0])
        
        print(f"🤖 DECISION TREE TARGET ASSIGNMENT: {assigned_level.upper()}")
        print("--------------------------------------\n")

        return jsonify({"level": assigned_level})
        
    except Exception as e:
        print(f"SERVER FAULT CAUGHT: {str(e)}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)

if action:
    if action["status"] == "distracted":
        # Send WebSocket payload to pop up an alert or pause a audio reading narrator
        print(f"ALERT: {action['message']}") 
        
    elif action["status"] == "fixated":
        # Send layout updates to UI to replace word text box or show tooltips 
        print(f"INTERVENTION: {action['message']}")