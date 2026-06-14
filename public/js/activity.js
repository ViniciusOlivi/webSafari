document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question:
        "Which of these is the primary cause of habitat loss for many species?",
      options: ["Deforestation", "Rainfall", "Solar Eclipses", "Wind Turbines"],
      correct: 0, //deforestation is the correct answer
    },
    {
      question: "Approximately how many tree species exist on Earth?",
      options: ["10,000", "73,000", "1 Million", "500"],
      correct: 1, //73,000 is the correct answer
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correct: 1, //Blue Whale is the correct answer
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  //Dom elements

  const questionText = document.getElementById("questionText");
  const optionsGrid = document.getElementById("optionsGrid");
  const questionCount = document.getElementById("questionCount");
  const scroreDisplay = document.getElementById("scoreDisplay");

  const quizContainer = document.getElementById("quizContainer");
  const resultContainer = document.getElementById("resultContainer");
  const resultMessage = document.getElementById("resultMessage");
  const restartBtn = document.getElementById("restartBtn");

  // Function to display the current question
  function loadQuestion() {
    optionsGrid.innerHTML = ""; // Clear previous options
    let currentQ = questions[currentQuestionIndex];

    // Update question text and count
    questionText.textContent = currentQ.question;
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;

    // Create buttons for each option
    for (let i = 0; i < currentQ.options.length; i++) {
      let btn = document.createElement("button");
      btn.textContent = currentQ.options[i];
      btn.className = "quiz-btn";

      // Add click event listener to check the answer
      btn.onclick = function () {
        checkAnswer(i);
      };
      optionsGrid.appendChild(btn);
    }
  }

  function checkAnswer(selectedIndex) {
    let currentQ = questions[currentQuestionIndex];
    if (selectedIndex === currentQ.correct) {
      score++;
    }
    // Move to the next question or show results if it was the last question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultMessage.textContent = `You scored ${score} out of ${questions.length}!`;
  }

  // Restart the quiz
  restartBtn.onclick = function () {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
  };

  if (questionText) {
    loadQuestion();
  }
});
