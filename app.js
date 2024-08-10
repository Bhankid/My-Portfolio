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
/*
// Contact form submission handling
const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Message sent successfully!");
  // Your form submission logic here
});
*/

// Initialize EmailJS with user ID
emailjs.init(userID);

// Contact form submission handling
const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Set up EmailJS template parameters
  const templateParams = {
    name,
    email,
    message,
  };

  // Send email using EmailJS
  emailjs.send(serviceID, templateID, templateParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      alert("Message sent successfully!");
      //Clear the form fields after success
      contactForm.reset();
    },
    (error) => {
      console.log("FAILED...", error);
      alert("Error sending message. Please try again.");
    }
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector("footer p");
  footer.innerHTML = `&copy; ${currentYear} All Rights Reserved by <span>Alfred Fianyo</span>.`;
});
