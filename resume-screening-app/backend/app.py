from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ------------ LOAD MODEL FILES ------------
with open("tfidf.pkl", "rb") as f:
    tfidf = pickle.load(f)

with open("clf.pkl", "rb") as f:
    clf = pickle.load(f)


# ------------ ROUTES ------------

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Resume Screening API is running"})


# --- SIMPLE PREDICT ---
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    text = data["text"]
    vectorized = tfidf.transform([text])

    prediction = clf.predict(vectorized)[0]

    return jsonify({"prediction": prediction})


# --- ADVANCED ANALYSIS WITH CONFIDENCE ---
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    if "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400

    text = data["text"]
    vectorized = tfidf.transform([text])

    proba = clf.predict_proba(vectorized)[0]
    pred = clf.classes_[np.argmax(proba)]
    confidence = round(float(max(proba)), 4)

    return jsonify({
        "prediction": pred,
        "confidence": confidence,
        "probabilities": {
            clf.classes_[i]: float(prob)
            for i, prob in enumerate(proba)
        }
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
