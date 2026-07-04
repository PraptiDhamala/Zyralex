import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision



base_options = python.BaseOptions(
    model_asset_path="hand_landmarker.task"
)

options = vision.HandLandmarkerOptions(
    base_options=base_options,
    num_hands=2
)

detector = vision.HandLandmarker.create_from_options(options)



def angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    cosine = np.dot(ba, bc) / (
        np.linalg.norm(ba) *
        np.linalg.norm(bc) +
        1e-8
    )

    cosine = np.clip(cosine, -1.0, 1.0)

    return float(np.degrees(np.arccos(cosine)))


def dist(a, b):
    return float(np.linalg.norm(np.array(a) - np.array(b)))



def hand_features(pts):

    pts = np.array(pts)

    # Normalize around wrist
    wrist = pts[0]
    pts = pts - wrist

    scale = np.max(np.linalg.norm(pts, axis=1))

    if scale > 0:
        pts = pts / scale

    features = []

    fingers = [
        (1, 2, 3, 4),
        (5, 6, 7, 8),
        (9, 10, 11, 12),
        (13, 14, 15, 16),
        (17, 18, 19, 20)
    ]

    # Finger joint angles
    for f in fingers:
        features.append(angle(pts[f[0]], pts[f[1]], pts[f[2]]))
        features.append(angle(pts[f[1]], pts[f[2]], pts[f[3]]))

    # Fingertip distances
    tips = [4, 8, 12, 16, 20]

    for i in range(len(tips)):
        for j in range(i + 1, len(tips)):
            features.append(
                dist(
                    pts[tips[i]],
                    pts[tips[j]]
                )
            )

    # Palm orientation
    v1 = pts[5] - pts[0]
    v2 = pts[17] - pts[0]

    normal = np.cross(v1, v2)

    norm = np.linalg.norm(normal)

    if norm > 0:
        normal = normal / norm

    features.extend(normal.tolist())

    return features



def extract_features_from_frame(frame):

    # OpenCV BGR -> RGB
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=frame
    )

    result = detector.detect(mp_image)

    if not result.hand_landmarks:
        return None

    hands = []

    for hand in result.hand_landmarks:

        pts = np.array([
            [lm.x, lm.y, lm.z]
            for lm in hand
        ])

        hands.append(hand_features(pts))

    # Ensure fixed-length feature vector
    if len(hands) == 1:
        return hands[0] + hands[0]

    return hands[0] + hands[1]



def extract_features_from_bytes(image_bytes):
    """
    Converts uploaded image bytes into a feature vector.
    Returns None if no hand is detected.
    """

    np_image = np.frombuffer(image_bytes, np.uint8)

    frame = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

    if frame is None:
        return None

    return extract_features_from_frame(frame)