// -------------------------
// Total Care MCQ Quiz Engine - 4-option MCQs, fully shuffled
// -------------------------

let index = 0;
let correct = 0;
let wrong = 0;

// Example questions structure
let questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1, // index of correct answer ("4")
    explanation: "2 + 2 equals 4."
  },
  {
    question: "Capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    answer: 0, // "Paris"
    explanation: "Paris is the capital of France."
  },
  {
    question: "Largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 2, // "Jupiter"
    explanation: "Jupiter is the largest planet."
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1, // "Carbon Dioxide"
    explanation: "Plants absorb carbon dioxide for photosynthesis."
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Water", "Hydrogen", "Salt"],
    answer: 1, // "Water"
    explanation: "H2O is the chemical formula for water."
  }
];

// -------------------------
// Shuffle helper (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// -------------------------
// Initialize quiz: shuffle questions and options
function initializeQuiz() {
  shuffleArray(questions); // Shuffle questions

  questions.forEach(q => {
    const correctText = q.options[q.answer]; // Store correct answer text
    shuffleArray(q.options);                 // Shuffle options
    q.answer = q.options.indexOf(correctText); // Update index of correct answer
  });

  index = Math.floor(Math.random() * questions.length); // Start at random question
  userAnswers = new Array(questions.length).fill(null);
}

// -------------------------
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
// Handle answer selection
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
// Navigation: Next / Previous / Finish
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
// Initialize the quiz on page load
initializeQuiz();
showQuestion();
