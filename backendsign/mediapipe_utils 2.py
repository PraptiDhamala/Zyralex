import cv2
import mediapipe as mp
import numpy as np

mp_holistic = mp.solutions.holistic.Holistic(
    static_image_mode=True,
    model_complexity=1,
    smooth_landmarks=True
)

# -----------------------------
# NORMALIZATION (VERY IMPORTANT)
# -----------------------------
def normalize_landmarks(landmarks):
    arr = np.array(landmarks).reshape(-1, 3)

    # remove global position (use wrist as origin if available)
    origin = arr[0]
    arr = arr - origin

    # scale normalization
    norm = np.linalg.norm(arr, axis=1).max() + 1e-6
    arr = arr / norm

    return arr.flatten().tolist()


# -----------------------------
# IMAGE → FRAME
# -----------------------------
def extract_landmarks(image_bytes):

    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return None

    return extract_landmarks_from_frame(img)


# -----------------------------
# FRAME → LANDMARKS
# -----------------------------
def extract_landmarks_from_frame(frame):

    if frame is None:
        return None

    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = mp_holistic.process(img_rgb)

    landmarks = []

    # LEFT HAND
    if results.left_hand_landmarks:
        for lm in results.left_hand_landmarks.landmark:
            landmarks.extend([lm.x, lm.y, lm.z])
    else:
        landmarks.extend([0] * 21 * 3)

    # RIGHT HAND
    if results.right_hand_landmarks:
        for lm in results.right_hand_landmarks.landmark:
            landmarks.extend([lm.x, lm.y, lm.z])
    else:
        landmarks.extend([0] * 21 * 3)

    # -----------------------------
    # IMPORTANT FIX: NORMALIZE HERE
    # -----------------------------
    landmarks = normalize_landmarks(landmarks)

    return landmarks