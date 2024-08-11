const chatContainer = document.querySelector(".chat-container");
const chatMessages = document.querySelector(".chat-messages");
const chatForm = document.querySelector("#chat-form");
const userInput = document.querySelector("#user-input");

(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });

  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
})();

let conversation = [];

// OpenAI API settings
const apiEndpoint =
  "https://api.openai.com/v1/engines/davinci-codex/completions";
const apiKey =
  "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";

// Initialize chatbot
chatContainer.style.display = "block"; // Always show the chatbot

// Send message to OpenAI API
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userInputValue = userInput.value.trim();
  if (userInputValue !== "") {
    addMessage(userInputValue, "user");
    fetchOpenAIResponse(userInputValue);
    userInput.value = ""; // Clear input field
  }
});

function addMessage(content, role) {
  const messageHTML = document.createElement("div");
  messageHTML.classList.add("chat-message", role);
  messageHTML.innerHTML = `<p>${content}</p>`;
  chatMessages.appendChild(messageHTML);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

function fetchOpenAIResponse(prompt) {
  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: `You are a helpful assistant. ${prompt}`,
      max_tokens: 150,
      temperature: 0.7,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const response = data.choices[0].text.trim();
      addMessage(response, "assistant");
    })
    .catch((error) => {
      console.error("Error fetching response:", error);
      addMessage(
        "Sorry, something went wrong. Please try again later.",
        "assistant"
      );
    });
}

// const form = document.getElementById("contact-form");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch(form.action, {
//       method: form.method,
//       body: new FormData(form),
//     });
//     const data = await response.json();

//     if (data.success) {
//       form.reset();
//       addMessage("Message sent successfully!", "assistant");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// const form = document.getElementById("contact-form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   form.reset();
// });

document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector("footer p");
  footer.innerHTML = `&copy; ${currentYear} All Rights Reserved by <span>Alfred Fianyo</span>.`;
});
