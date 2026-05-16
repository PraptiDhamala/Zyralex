import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
data = pd.read_csv("students.csv")

# Features and Labels
X = data[["score", "mistakes", "reading_speed"]]
y = data["level"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Calculate accuracy
accuracy = model.score(X_test, y_test)
print(f"Model Training Accuracy: {accuracy * 100:.2f}%")

# Save model file cleanly
joblib.dump(model, "dyslexia_model.pkl")
print("Successfully generated and saved dyslexia_model.pkl!")