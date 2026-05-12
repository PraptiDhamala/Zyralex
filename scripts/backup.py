import pandas as pd
import requests
import os
import cv2

CSV_PATH = "data/signs.csv"

df = pd.read_csv(CSV_PATH)

# ---------------- helpers ----------------
def download_file(url, path):
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    with open(path, "wb") as f:
        f.write(r.content)

def extract_thumbnail(video_path, image_path):
    cap = cv2.VideoCapture(video_path)

    # skip a bit for better frame quality
    cap.set(cv2.CAP_PROP_POS_FRAMES, 10)

    success, frame = cap.read()
    if success:
        cv2.imwrite(image_path, frame)

    cap.release()

# ---------------- main loop ----------------
for _, row in df.iterrows():

    word = str(row["word"]).strip()
    category = str(row["category"]).strip()

    video_url = str(row["video_url"]).strip()
    image_url = str(row["image_url"]).strip() if "image_url" in row else ""

    video_dir = f"dataset/videos/{category}"
    image_dir = f"dataset/images/{category}"

    os.makedirs(video_dir, exist_ok=True)
    os.makedirs(image_dir, exist_ok=True)

    video_path = f"{video_dir}/{word}.mp4"
    image_path = f"{image_dir}/{word}.jpg"

    # ---------------- download video ----------------
    try:
        if video_url.startswith("http"):
            print(f" Downloading video: {word}")
            download_file(video_url, video_path)

    except Exception as e:
        print(f"Video failed: {word} | {e}")
        continue

    # ---------------- image logic ----------------
    try:
        if image_url and image_url.startswith("http"):
            print(f" Downloading image: {word}")
            download_file(image_url, image_path)
        else:
            print(f" Generating thumbnail: {word}")
            extract_thumbnail(video_path, image_path)

    except Exception as e:
        print(f"Image failed: {word} | {e}")

    print(f" Done: {word}")