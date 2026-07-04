import os
import json

DATASET_PATH = "../datasetssign/features_dataset"


def normalize_name(name):
    return (
        name.lower()
        .replace("_", " ")
        .replace("-", " ")
        .strip()
    )


def load_dataset():
    database = {}

    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(
            f"Dataset folder not found: {DATASET_PATH}"
        )

    files = [
        f for f in os.listdir(DATASET_PATH)
        if f.endswith(".json")
    ]

    print(f"Loading {len(files)} signs...")

    for file in files:

        path = os.path.join(DATASET_PATH, file)

        with open(path, "r") as f:
            data = json.load(f)

        sign = normalize_name(data["sign"])

        database[sign] = data

        print(
            f"Loaded {sign} "
            f"({len(data['sequence'])} frames)"
        )

    print(f"\nTotal signs loaded: {len(database)}")

    return database