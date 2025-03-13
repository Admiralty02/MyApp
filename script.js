
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    const topBtn = document.getElementById("topBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedback-form");
    const formMessage = document.getElementById("form-message");
    const messageInput = document.getElementById("message");
    const charCount = document.getElementById("char-count");

    // Character count update
    messageInput.addEventListener("input", function () {
        const currentLength = messageInput.value.length;
        charCount.textContent = `${currentLength} / 500 characters`;

        if (currentLength >= 450) {
            charCount.style.color = "#e74c3c"; // Turns red when close to limit
        } else {
            charCount.style.color = "#666";
        }
    });

    // Form Submission Logic
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showMessage("Please fill out all fields.", "error");
            return;
        }

        // Submit the form data
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        })
        .then(response => {
            if (response.ok) {
                showMessage("Thank you for your feedback! I'll get back to you soon.", "success");
                form.reset();
                charCount.textContent = "0 / 500 characters"; // Reset character count
            } else {
                showMessage("Oops! Something went wrong. Please try again.", "error");
            }
        })
        .catch(() => {
            showMessage("Network error. Please check your internet connection.", "error");
        });
    });

    // Function to display messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type; // 'success' or 'error'
        formMessage.classList.remove("hidden");

        setTimeout(() => {
            formMessage.classList.add("hidden");
        }, 5000);
    }
});