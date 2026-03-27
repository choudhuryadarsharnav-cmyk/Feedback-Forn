let rating = 0;

// Create stars
let starsContainer = document.getElementById("stars");

for (let i = 1; i <= 10; i++) {
    let star = document.createElement("span");
    star.innerHTML = "★";

    star.onclick = function () {
        rating = i;
        updateStars();
    };

    starsContainer.appendChild(star);
}

function updateStars() {
    let stars = document.querySelectorAll(".stars span");

    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }
    });
}

// Recommendation selection
let selectedOption = "";

function selectOption(btn) {
    selectedOption = btn.innerText;

    document.querySelectorAll(".options button").forEach(b => {
        b.style.opacity = "0.5";
    });

    btn.style.opacity = "1";
}

// Submit
function submitForm() {
    let name = document.getElementById("name").value;
    let suggestion = document.getElementById("suggestion").value;
    let emotion = document.getElementById("emotion").value;

    if (!name || rating === 0 || !selectedOption) {
        document.getElementById("success").innerHTML = "Please complete all required fields";
        return;
    }

    // Premium success animation
    document.getElementById("success").innerHTML =
        "<div class='animate__animated animate__zoomIn'>✨ Thank you! Your feedback is valuable ✨</div>";

    // Email (basic)
    let body = `Name: ${name}
Rating: ${rating}/10
Suggestion: ${suggestion}
Recommendation: ${selectedOption}
Emotion: ${emotion}`;

    fetch("https://formspree.io/f/mvzvgyjj", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        rating: rating,
        suggestion: suggestion,
        recommendation: selectedOption,
        emotion: emotion
    })
})
.then(() => {
    document.getElementById("success").innerHTML =
        "✨ Feedback submitted successfully!";
})
.catch(() => {
    document.getElementById("success").innerHTML =
        "Error submitting feedback.";
});
}