// Mobile Menu Toggle
const mobileToggle = document.getElementById("mobile-toggle");
const mobileNav = document.getElementById("mobile-nav");

mobileToggle.addEventListener("click", () => {
  if (mobileNav.style.display === "block") {
    mobileNav.style.display = "none";
  } else {
    mobileNav.style.display = "block";
  }
});

// Hero Slider
let slides = document.querySelectorAll(".hero-slide");
let currentIndex = 0;

const prev = document.querySelector(".prev-slide");
const next = document.querySelector(".next-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("current-slide");
    slide.style.display = "none";
    if (i === index) {
      slide.classList.add("current-slide");
      slide.style.display = "flex";
    }
  });
}

function nextSlide() {
  currentIndex++;
  if (currentIndex > slides.length - 1) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
}

next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

// Auto-play slides (optional)
setInterval(() => {
  nextSlide();
}, 5000);

// Initialize the first slide
showSlide(currentIndex);

// Add this to your existing scripts.js file
document.addEventListener('DOMContentLoaded', function() {
    const configureRfqLink = document.getElementById('configure-rfq');
    const aiChatBox = document.getElementById('ai-chat-box');
    const closeChat = document.getElementById('close-chat');

    configureRfqLink.addEventListener('click', function(e) {
        e.preventDefault();
        aiChatBox.classList.remove('hidden');
    });

    closeChat.addEventListener('click', function() {
        aiChatBox.classList.add('hidden');
    });

    const chatInputs = document.querySelectorAll('.chat-input');
    const sendButtons = document.querySelectorAll('.chat-send');

    sendButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const input = chatInputs[index];
            const message = input.value.trim();
            
            if (message) {
                // Here you can handle the message, e.g., send to a server
                console.log('Message sent:', message);
                input.value = ''; // Clear input after sending
            }
        });
    });

    // Allow sending message with Enter key
    chatInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = input.value.trim();
                if (message) {
                    console.log('Message sent:', message);
                    input.value = '';
                }
            }
        });
    });
});
