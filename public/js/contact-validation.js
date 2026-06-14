document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  // Only run validation if the form exists on the page
  if (form) {
    form.addEventListener("submit", (e) => {
      let isValid = true;

      // Get input field values
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      // Get error message
      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const subjectError = document.getElementById("subjectError");
      const messageError = document.getElementById("messageError");

      // Reset all error messages
      nameError.textContent = "";
      emailError.textContent = "";
      subjectError.textContent = "";
      messageError.textContent = "";

      // Validate Name
      if (name.value.trim() === "") {
        nameError.textContent = "Please enter your full name.";
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email address.";
        isValid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email format.";
        isValid = false;
      }

      // Validate Subject Dropdown
      if (subject.value === "") {
        subjectError.textContent = "Please select a subject from the list.";
        isValid = false;
      }

      // Validate Message
      if (message.value.trim() === "") {
        messageError.textContent =
          "Please type your message before submitting.";
        isValid = false;
      }

      // If any validation failed, stop the form submission
      if (!isValid) {
        e.preventDefault();
      }
    });
  }
});
