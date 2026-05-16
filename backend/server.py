from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("dyslexia_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    score = data["score"]
    mistakes = data["mistakes"]
    reading_speed = data["reading_speed"]

    prediction = model.predict([
        [score, mistakes, reading_speed]
    ])

    return jsonify({
        "level": prediction[0]
    })

if __name__ == "__main__":
    app.run(debug=True)