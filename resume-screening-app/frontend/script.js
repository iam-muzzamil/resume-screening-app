// ===============================
// CONFIG — ADD YOUR BACKEND URL
// ===============================
const API_URL = "https://your-backend-url.up.railway.app/analyze"; 
// 🚨 Replace later after Railway deploys


// ===============================
// MAIN FUNCTION — ANALYZE RESUME
// ===============================
async function analyzeResume() {
    const input = document.getElementById("resumeInput").value.trim();
    const resultBox = document.getElementById("resultBox");
    const resultText = document.getElementById("resultText");

    // Hide result initially
    resultBox.classList.add("hidden");
    resultText.innerHTML = "";

    // Validation
    if (input.length < 20) {
        resultText.innerHTML = "⚠ Please paste a proper resume (minimum 20 characters).";
        resultBox.classList.remove("hidden");
        return;
    }

    // Show loading animation
    showLoading(true);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: input }),
        });

        const data = await response.json();

        // Hide loading animation
        showLoading(false);

        // Safety check
        if (!data.prediction) {
            resultText.innerHTML = "❌ Something went wrong. Try again.";
            resultBox.classList.remove("hidden");
            return;
        }

        // Set result text
        resultText.innerHTML = `
            <span class="font-semibold text-blue-400 text-lg">Prediction:</span> 
            <span class="text-gray-200">${data.prediction}</span>
            <br><br>
            <span class="font-semibold text-blue-400">Confidence:</span> 
            <span class="text-gray-300">${(data.confidence * 100).toFixed(2)}%</span>
        `;

        resultBox.classList.remove("hidden");

    } catch (err) {
        showLoading(false);

        resultText.innerHTML = "❌ Network error. Check backend URL.";
        resultBox.classList.remove("hidden");
    }
}



// ===============================
// LOADING ANIMATION CONTROL
// ===============================
function showLoading(state) {
    let loader = document.getElementById("loading");

    if (!loader) {
        // Create loader dynamically if not present
        loader = document.createElement("div");
        loader.id = "loading";
        loader.innerHTML = `<div class="loader"></div>`;
        document.querySelector("section").appendChild(loader);
    }

    loader.style.display = state ? "flex" : "none";
}