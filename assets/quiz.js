// Quiz Engine for Total Care MCQ System

let index = 0
let correct = 0
let wrong = 0
let userAnswers = new Array(questions.length).fill(null)

// store user answers
let userAnswers = new Array(questions.length).fill(null)

function showQuestion(){

let q = questions[index]

document.getElementById("progress").innerHTML =
"<b>Question " + (index+1) + " / " + questions.length + "</b>"

let html = "<div class='question'>" + q.question + "</div>"

q.options.forEach((opt,i)=>{

html += "<div class='option' onclick='answer("+i+")'>" + opt + "</div>"

})

document.getElementById("quiz").innerHTML = html

let savedAnswer = userAnswers[index]

if(savedAnswer !== null){

let opts = document.querySelectorAll(".option")

opts.forEach(o => o.style.pointerEvents="none")

if(savedAnswer == q.answer){

opts[savedAnswer].classList.add("correct")

}else{

opts[savedAnswer].classList.add("wrong")
opts[q.answer].classList.add("correct")

}

document.getElementById("explanation").innerHTML =
"<p>"+q.explanation+"</p>"

}else{

document.getElementById("explanation").innerHTML=""

}

}

// answer selection
function answer(i){

if(userAnswers[index] !== null) return

let q = questions[index]

userAnswers[index] = i

let opts = document.querySelectorAll(".option")

opts.forEach(o => o.style.pointerEvents="none")

if(i == q.answer){

opts[i].classList.add("correct")
correct++

}else{

opts[i].classList.add("wrong")
opts[q.answer].classList.add("correct")
wrong++

}

document.getElementById("correct").innerText = correct
document.getElementById("wrong").innerText = wrong

document.getElementById("explanation").innerHTML =
"<p>"+q.explanation+"</p>"

}

// next question
function nextQuestion(){

if(index < questions.length - 1){

index++
showQuestion()
window.scrollTo(0,0)

}else{

finishQuiz()

}

}

// previous question
function prevQuestion(){

if(index > 0){

index--
showQuestion()
window.scrollTo(0,0)

}

}

// finish quiz
function finishQuiz(){

document.getElementById("quiz").innerHTML=""

document.getElementById("score").innerHTML =
"<h3>Quiz Finished</h3>" +
"<p>Correct: "+correct+"</p>" +
"<p>Wrong: "+wrong+"</p>" +
"<p>Total Questions: "+questions.length+"</p>"

}

// start quiz
showQuestion()
