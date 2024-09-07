// const chatContainer = document.querySelector(".chat-container");
// const chatMessages = document.querySelector(".chat-messages");
// const chatForm = document.querySelector("#chat-form");
// const userInput = document.querySelector("#user-input");

(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });

  // document.querySelector(".theme-btn").addEventListener("click", () => {
  //   document.body.classList.toggle("light-mode");
  // });

  // const themeBtn = document.querySelector(".theme-btn");
  // const lightModeIcon = document.querySelector("#light-mode-icon");
  // const darkModeIcon = document.querySelector("#dark-mode-icon");

  // themeBtn.addEventListener("click", () => {
  //   document.body.classList.toggle("light-mode");
  //   lightModeIcon.classList.toggle("hidden");
  //   darkModeIcon.classList.toggle("hidden");
  // });

  // Theme toggle logic with localStorage
  const themeBtn = document.querySelector(".theme-btn");
  const lightModeIcon = document.querySelector("#light-mode-icon");
  const darkModeIcon = document.querySelector("#dark-mode-icon");

  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem("theme");

  // Apply the saved theme on page load
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    lightModeIcon.classList.remove("hidden");
    darkModeIcon.classList.add("hidden");
  } else {
    document.body.classList.remove("light-mode");
    lightModeIcon.classList.add("hidden");
    darkModeIcon.classList.remove("hidden");
  }

  // Toggle theme and save the preference in localStorage
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");

    if (isLightMode) {
      localStorage.setItem("theme", "light");
      lightModeIcon.classList.remove("hidden");
      darkModeIcon.classList.add("hidden");
    } else {
      localStorage.setItem("theme", "dark");
      lightModeIcon.classList.add("hidden");
      darkModeIcon.classList.remove("hidden");
    }
  });
})();

// let conversation = [];

// OpenAI API settings
// const apiEndpoint =
//   "https://api.openai.com/v1/engines/davinci-codex/completions";
// const apiKey =
//   "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";

// Initialize chatbot
// chatContainer.style.display = "block"; // Always show the chatbot

// Send message to OpenAI API
// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const userInputValue = userInput.value.trim();
//   if (userInputValue !== "") {
//     addMessage(userInputValue, "user");
//     fetchOpenAIResponse(userInputValue);
//     userInput.value = ""; // Clear input field
//   }
// });

// function addMessage(content, role) {
//   const messageHTML = document.createElement("div");
//   messageHTML.classList.add("chat-message", role);
//   messageHTML.innerHTML = `<p>${content}</p>`;
//   chatMessages.appendChild(messageHTML);
//   chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
// }

// function fetchOpenAIResponse(prompt) {
//   fetch(apiEndpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       prompt: `You are a helpful assistant. ${prompt}`,
//       max_tokens: 150,
//       temperature: 0.7,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const response = data.choices[0].text.trim();
//       addMessage(response, "assistant");
//     })
//     .catch((error) => {
//       console.error("Error fetching response:", error);
//       addMessage(
//         "Sorry, something went wrong. Please try again later.",
//         "assistant"
//       );
//     });
// }

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

// Get the h1 element
const h1 = document.querySelector(".name");

// Create a function to type out the text
function typeText(element) {
  // Get the text content of the element
  const text = element.textContent;

  // Empty the element
  element.textContent = "";

  // Create a virtual cursor
  let cursor = 0;

  // Function to type out the text
  function type() {
    // If the cursor is less than the text length, add the next character
    if (cursor < text.length) {
      element.textContent += text[cursor];
      cursor++;
      setTimeout(type, 150);
    } else {
      // If the element has child elements, type out their text content
      if (element.children.length > 0) {
        for (let i = 0; i < element.children.length; i++) {
          typeText(element.children[i]);
        }
      }
    }
  }

  // Start typing
  type();
}

// Call the typeText function when the document loads
document.addEventListener("DOMContentLoaded", () => {
  typeText(h1);
});


// const imageStack = document.querySelector(".image-stack");
// const images = imageStack.children;

// let currentImage = 0;

// function slideImage() {
//   imageStack.classList.add("hide-image"); // Add the hide-image class to the image-stack element
//   images[currentImage].classList.remove("active");
//   currentImage = (currentImage + 1) % images.length;
//   images[currentImage].classList.add("active");
//   imageStack.classList.remove("hide-image"); // Remove the hide-image class from the image-stack element
// }

// setInterval(slideImage, 5000);

const imageStack = document.querySelector('.image-stack');
const images = imageStack.querySelectorAll('img');
let currentIndex = 0;

// hide all images on start
images.forEach((img) => img.classList.add('hide-image'));

// show first image after a short delay
setTimeout(() => {
  images[currentIndex].classList.remove('hide-image');
  images[currentIndex].classList.add('active-image');
}, 500);

// slideshow animation
setInterval(() => {
  images[currentIndex].classList.remove('active-image');
  images[currentIndex].classList.add('hide-image');

  currentIndex = (currentIndex + 1) % images.length;

  images[currentIndex].classList.remove('hide-image');
  images[currentIndex].classList.add('active-image');
}, 5000); // change image every 3 seconds

// document.addEventListener("DOMContentLoaded", function () {
//   const currentYear = new Date().getFullYear();
//   const footer = document.querySelector("footer p");
//   footer.innerHTML = `&copy; ${currentYear} All Rights Reserved by <span>Alfred Fianyo</span>.`;
// });
