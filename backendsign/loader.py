import os
import json

DATASET_PATH = "../datasetssign/processed_landmarkers"

def load_dataset():
    database = {}

    for file in os.listdir(DATASET_PATH):
        if not file.endswith(".json"):
            continue

        path = os.path.join(DATASET_PATH, file)

        with open(path, "r") as f:
            data = json.load(f)

        database[data["sign"]] = data["sequence"]

    return database