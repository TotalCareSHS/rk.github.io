// Total Care MCQ Quiz Engine

let index = 0;
let correct = 0;
let wrong = 0;

// Example questions structure
let questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1, // index of correct answer
    explanation: "2 + 2 equals 4."
  },
  {
    question: "Capital of France?",
    options: ["Paris", "Berlin", "London", "Rome"],
    answer: 0,
    explanation: "Paris is the capital of France."
  }
  // Add more questions here
];

// Shuffle options for each question
function shuffleOptions() {
  questions.forEach(q => {
    const correctText = q.options[q.answer];
    // Fisher-Yates shuffle
    for (let i = q.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
    }
    // Update correct answer index after shuffle
    q.answer = q.options.indexOf(correctText);
  });
}

// Store user answers
let userAnswers = new Array(questions.length).fill(null);

// Show current question
function showQuestion() {
  let q = questions[index];

  document.getElementById("progress").innerHTML =
    "<b>Question " + (index + 1) + " / " + questions.length + "</b>";

  let html = "<div class='question'>" + q.question + "</div>";

  q.options.forEach((opt, i) => {
    html += "<div class='option' onclick='answer(" + i + ")'>" + opt + "</div>";
  });

  document.getElementById("quiz").innerHTML = html;

  // Show previously selected answer
  let savedAnswer = userAnswers[index];
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

// Handle answer selection
function answer(i) {
  if (userAnswers[index] !== null) return;

  let q = questions[index];
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

// Next question
function nextQuestion() {
  if (index < questions.length - 1) {
    index++;
    showQuestion();
    window.scrollTo(0, 0);
  } else {
    finishQuiz();
  }
}

// Previous question
function prevQuestion() {
  if (index > 0) {
    index--;
    showQuestion();
    window.scrollTo(0, 0);
  }
}

// Finish quiz
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

// Initialize quiz
shuffleOptions();
showQuestion();
