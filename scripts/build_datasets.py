import pandas as pd
import os
import cv2

CSV_PATH = "data/signs.csv"
df = pd.read_csv(CSV_PATH)

# only numbers
df = df[df["word"].astype(str).str.isdigit()]

def extract_thumbnail(video_path, image_path):
    cap = cv2.VideoCapture(video_path)

    cap.set(cv2.CAP_PROP_POS_MSEC, 1000)

    success, frame = cap.read()

    if success:
        cv2.imwrite(image_path, frame)

    cap.release()

for _, row in df.iterrows():

    word = str(row["word"]).strip()
    category = str(row["category"]).strip()

    video_path = f"dataset/videos/{category}/{word}.mp4"
    image_path = f"dataset/images/{category}/{word}.jpg"

    if not os.path.exists(video_path):
        print(f" Missing video: {word}")
        continue

    #  overwrite old thumbnails
    if os.path.exists(image_path):
        os.remove(image_path)
        print(f"Replacing: {word}")

    print(f" Creating thumbnail: {word}")
    extract_thumbnail(video_path, image_path)

    print(f"Done: {word}")