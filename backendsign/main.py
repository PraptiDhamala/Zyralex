from typing import List

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from loader import load_dataset
from mediapipe_utils import extract_features_from_bytes
from dtw_engine import dtw_distance

# -------------------------------------------------------
# FASTAPI
# -------------------------------------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------
# LOAD DATASET
# -------------------------------------------------------

print("Loading sign dataset...")

database = load_dataset()

print(f"Loaded {len(database)} signs.")

# -------------------------------------------------------
# HELPERS
# -------------------------------------------------------

def normalize_name(name: str):
    return (
        name.lower()
        .replace("_", " ")
        .replace("-", " ")
        .strip()
    )


def normalize_score(distance: float):
    """
    Convert DTW distance into similarity.
    Smaller distance = larger score.
    """

    similarity = 100 / (1 + distance / 100)

    similarity = max(0, min(100, similarity))

    return similarity


def generate_feedback(score: float):

    if score >= 90:
        return "Excellent! "

    elif score >= 80:
        return "Very Good !"

    elif score >= 65:
        return "Good Attempt !"

    elif score >= 50:
        return "Almost There "

    return "Try Again ❗"

# -------------------------------------------------------
# ROOT
# -------------------------------------------------------

@app.get("/")
def root():

    return {
        "status": "running",
        "dataset_size": len(database)
    }

# -------------------------------------------------------
# PREDICT
# -------------------------------------------------------

@app.post("/predict")
async def predict(

    images: List[UploadFile] = File(...),

    target_sign: str = Form(...)

):

    target_sign = normalize_name(target_sign)

    print("\n----------------------------------------")
    print("Target sign:", target_sign)

    # ------------------------------------
    # CHECK SIGN
    # ------------------------------------

    if target_sign not in database:

        print("Sign not found.")

        return {
            "score": 0,
            "feedback": "Sign not found.",
            "completed": False
        }

    # ------------------------------------
    # BUILD USER SEQUENCE
    # ------------------------------------

    user_sequence = []

    for image in images:

        image_bytes = await image.read()

        features = extract_features_from_bytes(image_bytes)

        if features is not None:
            user_sequence.append(features)

    print("Captured frames:", len(user_sequence))

    if len(user_sequence) == 0:

        return {
            "score": 0,
            "feedback": "No hands detected.",
            "completed": False
        }

    # ------------------------------------
    # LOAD REFERENCE
    # ------------------------------------

    reference = database[target_sign]

    reference_sequence = reference["sequence"]

    print("Reference frames:", len(reference_sequence))

    # ------------------------------------
    # RUN DTW
    # ------------------------------------

    distance = dtw_distance(
        user_sequence,
        reference_sequence
    )

    similarity = normalize_score(distance)

    feedback = generate_feedback(similarity)

    completed = similarity >= 80

    print("DTW distance :", distance)
    print("Similarity   :", similarity)

    # ------------------------------------
    # RESPONSE
    # ------------------------------------

    return {

        "target_sign": target_sign,

        "score": round(float(similarity), 2),

        "raw_distance": round(float(distance), 2),

        "feedback": feedback,

        "completed": completed,

        "frames": len(user_sequence)

    }