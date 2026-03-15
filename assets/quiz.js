// -------------------------
// Total Care MCQ Quiz Engine - Fully Randomized
// -------------------------

let index = 0;
let correct = 0;
let wrong = 0;

// Example questions structure
let questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1,
    explanation: "2 + 2 equals 4."
  },
  {
    question: "Capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    answer: 0,
    explanation: "Paris is the capital of France."
  },
  {
    question: "Largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 2,
    explanation: "Jupiter is the largest planet."
  }
  // Add more questions here
];

// -------------------------
// Shuffle helper (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Shuffle questions and options
function initializeQuiz() {
  // Shuffle questions
  shuffleArray(questions);

  // Shuffle options inside each question
  questions.forEach(q => {
    const correctText = q.options[q.answer];
    shuffleArray(q.options);
    q.answer = q.options.indexOf(correctText);
  });

  // Initialize user answers
  userAnswers = new Array(questions.length).fill(null);

  // Start at a random question
  index = Math.floor(Math.random() * questions.length);
}

// Store user answers
let userAnswers = [];

// -------------------------
// Show current question
function showQuestion() {
  const q = questions[index];
  document.getElementById("progress").innerHTML =
    "<b>Question " + (index + 1) + " / " + questions.length + "</b>";

  let html = "<div class='question'>" + q.question + "</div>";
  q.options.forEach((opt, i) => {
    html += "<div class='option' onclick='answer(" + i + ")'>" + opt + "</div>";
  });
  document.getElementById("quiz").innerHTML = html;

  // Show previously selected answer if returning
  const savedAnswer = userAnswers[index];
  if (savedAnswer !== null) {
    const opts = document.querySelectorAll(".option");
    opts.forEach(o => (o.style.pointerEvents = "none"));
    if (savedAnswer === q.answer) {
      opts[savedAnswer].classList.add("correct");
    } else {
      opts[savedAnswer].classList.add("wrong");
      opts[q.answer].classList.add("correct");
    }
    document.getElementById("explanation").innerHTML =
      "<p>" + q.explanation + "</p>";
  } else {
    document.getElementById("explanation").innerHTML = "";
  }
}

// -------------------------
// Answer selection
function answer(i) {
  if (userAnswers[index] !== null) return;

  const q = questions[index];
  userAnswers[index] = i;

  const opts = document.querySelectorAll(".option");
  opts.forEach(o => (o.style.pointerEvents = "none"));

  if (i === q.answer) {
    opts[i].classList.add("correct");
    correct++;
  } else {
    opts[i].classList.add("wrong");
    opts[q.answer].classList.add("correct");
    wrong++;
  }

  document.getElementById("correct").innerText = correct;
  document.getElementById("wrong").innerText = wrong;
  document.getElementById("explanation").innerHTML =
    "<p>" + q.explanation + "</p>";
}

// -------------------------
// Next / Previous / Finish
function nextQuestion() {
  if (index < questions.length - 1) {
    index++;
    showQuestion();
    window.scrollTo(0, 0);
  } else {
    finishQuiz();
  }
}

function prevQuestion() {
  if (index > 0) {
    index--;
    showQuestion();
    window.scrollTo(0, 0);
  }
}

function finishQuiz() {
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("progress").innerHTML = "";
  document.getElementById("explanation").innerHTML = "";

  document.getElementById("score").innerHTML =
    "<h3>Quiz Finished</h3>" +
    "<p>Correct: " + correct + "</p>" +
    "<p>Wrong: " + wrong + "</p>" +
    "<p>Total Questions: " + questions.length + "</p>";
}

// -------------------------
// Initialize quiz
initializeQuiz();
showQuestion();
