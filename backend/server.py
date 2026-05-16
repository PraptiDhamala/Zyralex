from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("dyslexia_model.pkl")

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