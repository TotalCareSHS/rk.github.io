let index = 0
let correct = 0
let wrong = 0
let userAnswers = []

// initialize memory
function initQuiz(){
    userAnswers = new Array(questions.length).fill(null)
    showQuestion()
}

function showQuestion(){

let q = questions[index]

document.getElementById("progress").innerHTML =
"<b>Question "+(index+1)+" / "+questions.length+"</b>"

let html = "<div class='question'>" + q.question + "</div>"

q.options.forEach((opt,i)=>{
html += "<div class='option' onclick='answer("+i+")'>" + opt + "</div>"
})

document.getElementById("quiz").innerHTML = html

let saved = userAnswers[index]

if(saved !== null){

let opts = document.querySelectorAll(".option")

opts.forEach(o=>o.style.pointerEvents="none")

if(saved == q.answer){

opts[saved].classList.add("correct")

}else{

opts[saved].classList.add("wrong")
opts[q.answer].classList.add("correct")

}

document.getElementById("explanation").innerHTML =
"<p>"+q.explanation+"</p>"

}else{

document.getElementById("explanation").innerHTML=""

}

}

function answer(i){

if(userAnswers[index] !== null) return

let q = questions[index]

userAnswers[index] = i

let opts = document.querySelectorAll(".option")

opts.forEach(o=>o.style.pointerEvents="none")

if(i === q.answer){

opts[i].classList.add("correct")
correct++

}else{

opts[i].classList.add("wrong")
opts[q.answer].classList.add("correct")
wrong++

}

document.getElementById("correct").textContent = correct
document.getElementById("wrong").textContent = wrong

document.getElementById("explanation").innerHTML =
"<p>"+q.explanation+"</p>"

}

function nextQuestion(){

if(index < questions.length-1){

index++
showQuestion()
window.scrollTo(0,0)

}else{

finishQuiz()

}

}

function prevQuestion(){

if(index > 0){

index--
showQuestion()
window.scrollTo(0,0)

}

}

function finishQuiz(){

document.getElementById("quiz").innerHTML=""

document.getElementById("score").innerHTML =
"<h3>Quiz Finished</h3>"+
"<p>Correct: "+correct+"</p>"+
"<p>Wrong: "+wrong+"</p>"+
"<p>Total Questions: "+questions.length+"</p>"

}

// start quiz after page loads
window.onload = initQuiz
