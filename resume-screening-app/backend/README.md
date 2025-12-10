# 📄 AI Resume Screening App  
A smart, lightweight web app that instantly analyzes resume text and predicts suitability using a trained ML classifier (TF-IDF + Logistic Regression).  
Built with **HTML + CSS + JS** frontend and a **Flask** backend API.

---

## 🚀 Features  

### 🔍 Core Functionality  
- Paste any resume text  
- ML model predicts:
  - **Suitable / Not Suitable** (or your actual label)  
  - **Confidence score**  
- Clean UI with animated loader and glass-effect components  
- Fast API response (under 200ms on average)

### 🧠 Machine Learning  
The backend loads two pre-trained files:  
- `clf.pkl` → Logistic Regression model  
- `tfidf.pkl` → TF-IDF vectorizer  
(No heavy `.model.pkl` file needed)

### 🎨 Frontend Highlights  
- Minimal & modern UI  
- Responsive for desktop + mobile  
- Smooth glass morphism design  
- Animated loader  
- No frameworks → pure HTML, CSS, JS

---

## 🏗️ Project Structure  
resume-screening-app/
│
├── backend/
│ ├── app.py
│ ├── clf.pkl
│ ├── tfidf.pkl
│ └── requirements.txt
│
└── frontend/
├── index.html
├── style.css
└── script.js

