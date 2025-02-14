// Mobile Menu Toggle
const mobileToggle = document.getElementById("mobile-toggle");
const mobileNav = document.getElementById("mobile-nav");

mobileToggle.addEventListener("click", () => {
  mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block";
});

// Hero Slider (unchanged)
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
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

if (next && prev) {
  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);
}

// Auto-play slides (optional)
setInterval(() => {
  nextSlide();
}, 5000);

// Initialize the first slide
showSlide(currentIndex);

// Add chat styles to head with spinner and processing text styles
const chatStyles = document.createElement('style');
chatStyles.textContent = `
    .chat-interface {
        margin-top: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background: white;
    }
    .chat-messages {
        min-height: 100px;
        max-height: 300px;
        overflow-y: auto;
        padding: 15px;
    }
    .message {
        margin-bottom: 10px;
        display: flex;
        gap: 8px;
    }
    .message.user {
        justify-content: flex-end;
    }
    .message.user .text {
        background: #005386;
        color: white;
        padding: 8px 12px;
        border-radius: 15px;
        max-width: 80%;
    }
    .message.ai {
        justify-content: flex-start;
    }
    .message.ai .text {
        background: #f0f7ff;
        color: #333;
        padding: 8px 12px;
        border-radius: 15px;
        max-width: 80%;
    }
    .chat-input-area {
        display: flex;
        padding: 10px;
        gap: 10px;
        border-top: 1px solid #eee;
        background: #f8f9fa;
    }
    /* Spinner styles */
    .spinner {
        display: inline-block;
        width: 24px;
        height: 24px;
        border: 3px solid rgba(0, 83, 134, 0.3);
        border-radius: 50%;
        border-top-color: #005386;
        animation: spin 1s ease-in-out infinite;
        vertical-align: middle;
        margin-right: 8px;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    .processing-text {
        display: inline-block;
        vertical-align: middle;
    }
`;
document.head.appendChild(chatStyles);

/**
 * Attaches the chat functionality (listening for Enter and Send clicks)
 * to the provided chat interface element.
 */
function attachChatFunctionality(chatInterface) {
  const messagesDiv = chatInterface.querySelector('.chat-messages');
  const input = chatInterface.querySelector('input');
  const sendButton = chatInterface.querySelector('button');

  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    let content = '';
    if (!isUser) {
      content += `<img src="images/ai-icon.png" alt="AI" style="width: 24px; height: 24px;">`;
    }
    content += `<div class="text">${text}</div>`;
    messageDiv.innerHTML = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function handleMessage() {
    const text = input.value.trim();
    if (text !== '') {
      addMessage(text, true);
      input.value = '';

      // Add spinner and "processing request..." text for AI's delay
      const processingMessage = document.createElement('div');
      processingMessage.className = 'message ai';
      processingMessage.innerHTML = `
        <img src="images/ai-icon.png" alt="AI" style="width: 24px; height: 24px;">
        <div class="text">
          <span class="spinner"></span>
          <span class="processing-text">Processing your request...</span>
        </div>
      `;
      messagesDiv.appendChild(processingMessage);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      // After 3 seconds, remove the processing indicator and show the final AI response
      setTimeout(() => {
        messagesDiv.removeChild(processingMessage);
        addMessage('Thank you for your detailed request. I am configuring your single-side vertical stack storage system with 12 racks featuring automated loading, unloading, and retrieval. With each bin built to support up to 1200 lbs and designed to accommodate a wide range of object sizes—from very small to large—I’m now generating a quote tailored to your specific requirements.', false);
      }, 3000);
    }
  }

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMessage();
    }
  });

  sendButton.addEventListener('click', handleMessage);
}

/**
 * Initializes chat functionality:
 * 1. Attaches chat functionality to any chat box already in the HTML.
 * 2. For every hero-button with "Configure" text, ensures a chat box is present,
 *    and attaches chat functionality to it.
 */
function initializeChat() {
  // 1. Attach to existing chat interfaces (e.g. the one in your Multi-deep Shuttle section)
  document.querySelectorAll('.chat-interface').forEach((chatInterface) => {
    attachChatFunctionality(chatInterface);
  });

  // 2. For buttons that include "Configure", add a chat interface if one isn't present already
  const configButtons = Array.from(document.getElementsByClassName('hero-button')).filter(
    button => button.textContent.includes('Configure')
  );

  configButtons.forEach(button => {
    let chatInterface = button.nextElementSibling;
    if (!chatInterface || !chatInterface.classList.contains('chat-interface')) {
      chatInterface = document.createElement('div');
      chatInterface.className = 'chat-interface';
      chatInterface.innerHTML = `
            <div class="chat-messages">
                <div class="message ai">
                    <img src="images/ai-icon.png" alt="AI" style="width: 24px; height: 24px;">
                    <div class="text">Hi! How can I help you configure this system?</div>
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" placeholder="Type your message..." style="flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 5px;">
                <button style="padding: 8px 15px; background: #005386; color: white; border: none; border-radius: 5px; cursor: pointer;">Send</button>
            </div>
      `;
      button.parentNode.insertBefore(chatInterface, button.nextSibling);
    }
    attachChatFunctionality(chatInterface);
  });
}

// Initialize after DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChat);
} else {
  initializeChat();
}
