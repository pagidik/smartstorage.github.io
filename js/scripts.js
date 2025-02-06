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
