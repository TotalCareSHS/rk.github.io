<script>

const questions = [...questions]   // keep your existing question array exactly the same

let index = 0
let correct = 0
let wrong = 0
let userAnswers = new Array(questions.length).fill(null)

let timeLeft = 1800   // 30 minutes
let timerInterval

function startTimer(){

timerInterval = setInterval(function(){

let minutes = Math.floor(timeLeft/60)
let seconds = timeLeft%60

seconds = seconds<10 ? "0"+seconds : seconds

document.getElementById("timer").innerHTML =
"Time Left: "+minutes+":"+seconds

timeLeft--

if(timeLeft < 0){
finishQuiz()
}

},1000)

}

function showQuestion(){

let q = questions[index]

document.getElementById("progress").innerHTML =
"<b>Question "+(index+1)+" / "+questions.length+"</b>"

let html = "<div class='question'>"+q.question+"</div>"

q.options.forEach((opt,i)=>{

html += "<div class='option' onclick='answer("+i+")' id='opt"+i+"'>"+opt+"</div>"

})

document.getElementById("quiz").innerHTML = html
document.getElementById("explanation").innerHTML = ""

if(userAnswers[index] !== null){

let chosen = userAnswers[index]
let opts = document.querySelectorAll(".option")

opts.forEach(o=>o.style.pointerEvents="none")

if(chosen == q.answer){

document.getElementById("opt"+chosen).classList.add("correct")

}else{

document.getElementById("opt"+chosen).classList.add("wrong")
document.getElementById("opt"+q.answer).classList.add("correct")

}

document.getElementById("explanation").innerHTML =
"<p>"+q.explanation+"</p>"

}

}

function answer(i){

if(userAnswers[index] !== null) return

let q = questions[index]
userAnswers[index] = i

let opts = document.querySelectorAll(".option")
opts.forEach(o=>o.style.pointerEvents="none")

if(i == q.answer){

document.getElementById("opt"+i).classList.add("correct")
correct++

}else{

document.getElementById("opt"+i).classList.add("wrong")
document.getElementById("opt"+q.answer).classList.add("correct")
wrong++

}

document.getElementById("correct").innerText = correct
document.getElementById("wrong").innerText = wrong

document.getElementById("explanation").innerHTML =
"<p>"+q.explanation+"</p>"

}

function nextQuestion(){

if(index < questions.length-1){

index++
showQuestion()

}else{

finishQuiz()

}

}

function prevQuestion(){

if(index>0){

index--
showQuestion()

}

}

function finishQuiz(){

clearInterval(timerInterval)

document.getElementById("quiz").innerHTML=""

document.getElementById("score").innerHTML =
"<h2>Quiz Finished</h2>"+
"<p><b>Correct:</b> "+correct+"</p>"+
"<p><b>Wrong:</b> "+wrong+"</p>"+
"<p><b>Total:</b> "+questions.length+"</p>"

document.getElementById("review").innerHTML =
"<button onclick='reviewWrong()'>Review Wrong Answers</button>"

}

function reviewWrong(){

let html = "<h3>Wrong Questions Review</h3>"

questions.forEach((q,i)=>{

if(userAnswers[i] !== null && userAnswers[i] != q.answer){

html += "<div style='margin-bottom:20px'>"
html += "<b>"+q.question+"</b><br>"
html += "Your Answer: "+q.options[userAnswers[i]]+"<br>"
html += "Correct Answer: "+q.options[q.answer]+"<br>"
html += "<i>"+q.explanation+"</i>"
html += "</div>"

}

})

document.getElementById("review").innerHTML = html

}

startTimer()
showQuestion()

</script>
