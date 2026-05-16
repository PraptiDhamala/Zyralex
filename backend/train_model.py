import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
data = pd.read_csv("students.csv")

# Features
X = data[["score", "mistakes", "reading_speed"]]

# Labels
y = data["level"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = DecisionTreeClassifier()

model.fit(X_train, y_train)

# Accuracy
accuracy = model.score(X_test, y_test)

print("Accuracy:", accuracy)

# Save model
joblib.dump(model, "dyslexia_model.pkl")

print("Model saved successfully!")