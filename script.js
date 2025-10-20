//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("questions-screen");
const resultScreen = document.getElementById("results-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question-number");
const totalQuestionsSpan = document.getElementById("max-questions-number");
const scoreSpan = document.getElementById("current-score");
const finalScoreSpan = document.getElementById("correct-answers-number");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of Taiwan?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Taipei", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Clementine", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//Quiz state vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  //reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}
function showQuestion() {
  // reset state
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    // Dataset is a property of a button element that allows to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}
function selectAnswer(event) {
  //optimization check
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You are a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You did fantastic!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good job! Keep trying!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not so bad! There is room for improve!";
  } else {
    resultMessage.textContent = "Keep studying! You can try again!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
console.log(maxScoreSpan);
