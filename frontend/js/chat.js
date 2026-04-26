/* ============================================
   CHAT.JS - AI Chat Widget
   WhatsApp Style Chat with AI
   ============================================ */

// ============================================
// 1. ELEMENTS
// ============================================
const chatWidget = document.getElementById("chatWidget");
const chatFloatBtn = document.getElementById("chatFloatBtn");
const chatClose = document.getElementById("chatClose");
const chatMinimize = document.getElementById("chatMinimize");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const chatNotification = document.getElementById("chatNotification");
const chatStatus = document.getElementById("chatStatus");
const chatFloatIcon = document.getElementById("chatFloatIcon");

// ============================================
// 2. STATE
// ============================================
let isOpen = false;
let isMinimized = false;
let isTyping = false;

// Backend URL - baad mein change karenge
const BACKEND_URL = "http://localhost:5000";

// ============================================
// 3. OPEN / CLOSE CHAT
// ============================================

// Float button click - open/close chat
chatFloatBtn.addEventListener("click", () => {
  if (isOpen) {
    closeChat();
  } else {
    openChat();
  }
});

// Close button
chatClose.addEventListener("click", () => {
  closeChat();
});

// Minimize button
chatMinimize.addEventListener("click", () => {
  if (isMinimized) {
    // Maximize
    chatWidget.classList.remove("minimized");
    isMinimized = false;
  } else {
    // Minimize
    chatWidget.classList.add("minimized");
    isMinimized = true;
  }
});

function openChat() {
  isOpen = true;
  isMinimized = false;
  chatWidget.classList.add("open");
  chatWidget.classList.remove("minimized");

  // Change float button icon
  chatFloatIcon.classList.replace("fa-comment-dots", "fa-times");

  // Hide notification
  chatNotification.classList.add("hidden");

  // Show welcome message if first time
  if (chatMessages.children.length === 0) {
    showWelcomeMessage();
  }

  // Focus input
  setTimeout(() => chatInput.focus(), 300);
}

function closeChat() {
  isOpen = false;
  chatWidget.classList.remove("open");

  // Change float button icon back
  chatFloatIcon.classList.replace("fa-times", "fa-comment-dots");
}

// ============================================
// 4. WELCOME MESSAGE
// ============================================
function showWelcomeMessage() {
  // Date separator
  addDateSeparator("Today");

  // Welcome AI message
  setTimeout(() => {
    addMessage(
      "ai",
      "👋 Hi! I'm Kartik's AI Assistant. I can answer questions about Kartik's skills, projects, experience, and more!\n\nWhat would you like to know?"
    );

    // Quick question buttons
    setTimeout(() => {
      addQuickQuestions();
    }, 500);
  }, 400);
}

// ============================================
// 5. QUICK QUESTIONS
// ============================================
function addQuickQuestions() {
  const questions = [
    "🛠️ What are his skills?",
    "💼 Tell me about his projects",
    "🎯 What are his goals?",
    "📞 How to contact him?",
  ];

  const wrapper = document.createElement("div");
  wrapper.className = "message ai";

  const qContainer = document.createElement("div");
  qContainer.className = "quick-questions";

  questions.forEach((q) => {
    const btn = document.createElement("button");
    btn.className = "quick-q";
    btn.textContent = q;
    btn.addEventListener("click", () => {
      // Remove quick questions
      wrapper.remove();
      // Send as user message
      handleUserMessage(q);
    });
    qContainer.appendChild(btn);
  });

  wrapper.appendChild(qContainer);
  chatMessages.appendChild(wrapper);
  scrollToBottom();
}

// ============================================
// 6. SEND MESSAGE
// ============================================

// Send on button click
sendBtn.addEventListener("click", () => {
  sendMessage();
});

// Send on Enter key
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const message = chatInput.value.trim();

  // Empty check
  if (!message || isTyping) return;

  // Clear input
  chatInput.value = "";

  // Handle message
  handleUserMessage(message);
}

function handleUserMessage(message) {
  // Add user message bubble
  addMessage("user", message);

  // Disable input while AI is typing
  setInputDisabled(true);

  // Show typing indicator
  showTypingIndicator();

  // Send to backend
  sendToBackend(message);
}

// ============================================
// 7. BACKEND API CALL
// ============================================
async function sendToBackend(message) {
  try {
    // Session ID - browser mein save karo
    let sessionId = localStorage.getItem("chatSessionId");
    if (!sessionId) {
      sessionId = "session_" + Date.now();
      localStorage.setItem("chatSessionId", sessionId);
    }

    const response = await fetch(`${BACKEND_URL}/api/chat/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message, sessionId: sessionId }),
    });

    const data = await response.json();

    // Remove typing indicator
    removeTypingIndicator();

    if (data.aiMsg) {
      addMessage("ai", data.aiMsg.content);
    } else {
      addMessage("ai", "Sorry, I couldn't process that. Please try again! 🙏");
    }
  } catch (error) {
    removeTypingIndicator();
    addMessage("ai", getDemoResponse(message));
  } finally {
    setInputDisabled(false);
    chatInput.focus();
  }
}

// ============================================
// 8. DEMO RESPONSES (Jab backend ready nahi)
// ============================================
function getDemoResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("skill") || msg.includes("technology") || msg.includes("tech")) {
    return "🛠️ Kartik knows:\n\n• Frontend: HTML5, CSS3, JavaScript, React.js\n• Backend: Node.js, Express.js\n• Database: MongoDB, SQL\n• Tools: VS Code, Git, GitHub";
  }

  if (msg.includes("project")) {
    return "💼 Kartik's Projects:\n\n1. Personal Portfolio Website\n   🔗 bekartikrawat.vercel.app\n\n2. Restaurant Website\n   Built with HTML, CSS, JS\n\n3. Chat Application\n   Built with Node.js & MongoDB";
  }

  if (msg.includes("goal") || msg.includes("future") || msg.includes("plan")) {
    return "🎯 Kartik's Goals:\n\n• Short term: Get an internship or entry-level job\n• Long term: Become a Full Stack + AI Developer\n• Dream: Build products that help people 🚀";
  }

  if (msg.includes("contact") || msg.includes("email") || msg.includes("hire")) {
    return "📞 Contact Kartik:\n\n📧 kartikrawat1333@gmail.com\n📱 9389690052\n💼 linkedin.com/in/bekartikrawat\n🐙 github.com/bekartikrawat\n🌐 bekartikrawat.vercel.app";
  }

  if (msg.includes("education") || msg.includes("college") || msg.includes("study")) {
    return "🎓 Education:\n\nDiploma in CS&E\nGovt. Polytechnic Beeronkhal\nPauri Garhwal, Uttarakhand\n2022 - 2025";
  }

  if (msg.includes("who") || msg.includes("about") || msg.includes("kartik") || msg.includes("tell")) {
    return "👨‍💻 About Kartik:\n\nKartik Rawat is a motivated Full Stack Developer fresher from Delhi. He has practical knowledge of frontend and backend web technologies and is eager to learn and grow in the industry!";
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste")) {
    return "👋 Hello! Nice to meet you!\n\nI'm Kartik's AI Assistant. You can ask me about:\n• His skills & technologies\n• His projects\n• His goals\n• How to contact him\n\nWhat would you like to know? 😊";
  }

  // Default response
  return "🤔 I'm not sure about that. You can ask me about Kartik's skills, projects, goals, or contact info!\n\nOr connect directly:\n📧 kartikrawat1333@gmail.com";
}

// ============================================
// 9. ADD MESSAGE BUBBLE
// ============================================
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;

  // Markdown to HTML convert karo
  let formattedText = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code style='background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:4px;font-size:0.8rem'>$1</code>")
    .replace(/```[\w]*\n?([\s\S]*?)```/g, "<pre style='background:rgba(0,0,0,0.08);padding:10px;border-radius:8px;font-size:0.78rem;overflow-x:auto;margin-top:6px'>$1</pre>")
    .replace(/^#{1,3} (.+)/gm, "<strong style='font-size:0.95rem'>$1</strong>")
    .replace(/\n/g, "<br>");

  messageDiv.innerHTML = `
    <div class="message-bubble">${formattedText}</div>
    <span class="message-time">${getTime()}</span>
  `;

  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// ============================================
// 10. TYPING INDICATOR
// ============================================
function showTypingIndicator() {
  isTyping = true;

  // Update status
  chatStatus.textContent = "Typing...";

  const typingDiv = document.createElement("div");
  typingDiv.className = "message ai";
  typingDiv.id = "typingIndicator";

  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;

  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  isTyping = false;
  chatStatus.textContent = "Online";

  const indicator = document.getElementById("typingIndicator");
  if (indicator) indicator.remove();
}

// ============================================
// 11. HELPER FUNCTIONS
// ============================================

// Scroll to bottom of chat
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get current time
function getTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Date separator
function addDateSeparator(label) {
  const div = document.createElement("div");
  div.className = "welcome-msg";
  div.innerHTML = `<p>${label}</p>`;
  chatMessages.appendChild(div);
}

// Disable/Enable input
function setInputDisabled(disabled) {
  chatInput.disabled = disabled;
  sendBtn.disabled = disabled;
}

// ============================================
// 12. AUTO OPEN CHAT AFTER 3 SECONDS
// ============================================
setTimeout(() => {
  if (!isOpen) {
    // Show notification badge
    chatNotification.classList.remove("hidden");
    chatNotification.textContent = "1";

    // Bounce animation on float button
    chatFloatBtn.style.animation = "none";
    setTimeout(() => {
      chatFloatBtn.style.animation = "";
    }, 100);
  }
}, 3000);