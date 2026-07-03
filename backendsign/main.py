from fastapi import FastAPI
import base64
import numpy as np
import cv2
from collections import deque

from mediapipe_utils import extract_landmarks_from_frame
from loader import load_dataset
from dtw_engine import dtw_distance

app = FastAPI()

database = load_dataset()

THRESHOLD = 25

# -------------------------
# PER-USER BUFFER (FIXED)
# -------------------------
user_buffer = deque(maxlen=30)


# -------------------------
# IMAGE DECODER
# -------------------------
def decode_image(base64_str):
    img_data = base64.b64decode(base64_str)
    np_img = np.frombuffer(img_data, np.uint8)
    frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    return frame


# -------------------------
# FEEDBACK ENGINE
# -------------------------
def generate_feedback(accuracy):
    if accuracy > 85:
        return "Perfect! ✨"
    elif accuracy > 70:
        return "Good! 👍"
    elif accuracy > 50:
        return "Almost there 👀"
    else:
        return "Try again ❗ adjust your hand position"


# -------------------------
# NORMALIZE DTW SCORE
# -------------------------
def normalize_score(score, max_score=50):
    accuracy = 100 * (1 - score / max_score)
    return max(0, min(100, accuracy))


# -------------------------
# REALTIME ENDPOINT
# -------------------------
@app.post("/realtime")
async def realtime(data: dict):

    image = data.get("image")
    target_sign = data.get("target_sign")

    if not image:
        return {"error": "No image received"}

    frame = decode_image(image)
    landmarks = extract_landmarks_from_frame(frame)

    print("IMAGE RECEIVED:", image is not None)
    print("LANDMARKS FOUND:", landmarks is not None)

    if landmarks is None:
        return {
            "score": 0,
            "feedback": "No hand detected 👋",
            "completed": False
        }

    user_buffer.append(landmarks)

    print("BUFFER SIZE:", len(user_buffer))

    if len(user_buffer) < 3:
        return {
            "score": 0,
            "feedback": "Keep signing... 👋",
            "completed": False
        }

    print("ENTERING DTW BLOCK")

    # normalize label
    target_sign = target_sign.replace(" ", "_").strip()

    print("TARGET SIGN:", target_sign)

    ref_sequence = database.get(target_sign)

    print("REF FOUND:", ref_sequence is not None)

    if not ref_sequence:
        print("AVAILABLE:", list(database.keys())[:20])

        return {
            "score": 0,
            "feedback": f"Sign '{target_sign}' not found",
            "completed": False
        }

    print("REF LENGTH:", len(ref_sequence))
    print("USER LENGTH:", len(user_buffer))

    try:

        print("RUNNING DTW...")

        score = dtw_distance(
            list(user_buffer),
            ref_sequence
        )

        print("DTW SCORE:", score)

        accuracy = normalize_score(score)

        feedback = generate_feedback(accuracy)

        completed = accuracy > 80

        return {
            "score": float(accuracy),
            "raw_score": float(score),
            "feedback": feedback,
            "completed": completed
        }

    except Exception as e:

        print("DTW ERROR:", str(e))

        return {
            "score": 0,
            "feedback": str(e),
            "completed": False
        }