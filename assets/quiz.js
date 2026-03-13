```javascript
let index = 0
let correct = 0
let wrong = 0
let answered = []

function showQuestion(){

let q=questions[index];

let html="<div class='question'>"+q.question+"</div>";

q.options.forEach((opt,i)=>{

html+="<div class='option' onclick='answer("+i+")'>"+opt+"</div>";

});

document.getElementById("quiz").innerHTML=html;

}


function answer(i){

let q=questions[index];

let opts=document.querySelectorAll(".option");

opts.forEach(o=>o.style.pointerEvents="none");

if(i==q.answer){

opts[i].classList.add("correct");

score++;

}else{

opts[i].classList.add("wrong");

opts[q.answer].classList.add("correct");

}

setTimeout(()=>{

index++;

if(index>=questions.length){

finishQuiz();

}else{

showQuestion();

}

},1200);

}


function finishQuiz(){

document.getElementById("quiz").innerHTML="";

document.getElementById("score").innerHTML=

"<h3>Score: "+score+" / "+questions.length+"</h3>";

}
```
