/* ============================================
   MAIN.JS - Portfolio Interactions
   ============================================ */

// ============================================
// 1. NAVBAR - Scroll Effect + Mobile Menu
// ============================================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");

// Navbar shadow on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link on scroll
  updateActiveNav();
});

// Mobile hamburger menu toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu on link click
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ---- Active Nav Link on Scroll ----
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinkItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// ============================================
// 2. TYPING ANIMATION - Home Section
// ============================================
const typedTextEl = document.getElementById("typedText");

// Texts to type
const texts = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI Enthusiast",
  "Problem Solver",
];

let textIndex = 0;   // Which text
let charIndex = 0;   // Which character
let isDeleting = false;

function typeAnimation() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    // Delete characters
    typedTextEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Type characters
    typedTextEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  // Typing speed
  let speed = isDeleting ? 60 : 100;

  // When text is fully typed
  if (!isDeleting && charIndex === currentText.length) {
    speed = 1800; // Wait before deleting
    isDeleting = true;
  }

  // When text is fully deleted
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // Next text
    speed = 400;
  }

  setTimeout(typeAnimation, speed);
}

// Start typing animation
typeAnimation();

// ============================================
// 3. CONTACT FORM - Submit Handler
// ============================================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormAlert("Please fill all fields!", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFormAlert("Please enter a valid email!", "error");
    return;
  }

  // Success (for now - backend se connect karenge baad mein)
  showFormAlert(`Thanks ${name}! Message sent successfully! 🎉`, "success");
  contactForm.reset();
});

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show form alert message
function showFormAlert(msg, type) {
  // Remove existing alert
  const existing = document.querySelector(".form-alert");
  if (existing) existing.remove();

  const alert = document.createElement("div");
  alert.className = `form-alert form-alert-${type}`;
  alert.style.cssText = `
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    background: ${type === "success" ? "#d4edda" : "#f8d7da"};
    color: ${type === "success" ? "#155724" : "#721c24"};
    border: 1px solid ${type === "success" ? "#c3e6cb" : "#f5c6cb"};
  `;
  alert.textContent = msg;

  contactForm.appendChild(alert);

  // Auto remove after 4 seconds
  setTimeout(() => alert.remove(), 4000);
}

// ============================================
// 4. SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll(".project-card, .about-grid, .contact-grid").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(el);
});

// ============================================
// 5. OPEN CHAT FROM CONTACT SECTION
// ============================================
const openChatBtn = document.getElementById("openChatBtn");
const chatBtnNav = document.getElementById("chatBtnNav");

// Open chat from contact section button
if (openChatBtn) {
  openChatBtn.addEventListener("click", () => {
    // Trigger chat open (chat.js mein defined hai)
    document.getElementById("chatFloatBtn").click();
  });
}

// Open chat from navbar button
if (chatBtnNav) {
  chatBtnNav.addEventListener("click", () => {
    document.getElementById("chatFloatBtn").click();
  });
}