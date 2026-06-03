
window.Games = window.Games || {};
Games.quickMath = function(container){
 let score=0, correct;
 container.innerHTML=`<h2>🚀 Quick Math</h2><p id="question"></p><input id="answer"><button id="submitBtn">Submit</button><h3 id="score">Score: 0</h3>`;
 function nextQuestion(){
  const a=Math.floor(Math.random()*20), b=Math.floor(Math.random()*20);
  correct=a+b;
  document.getElementById("question").textContent=`${a} + ${b} = ?`;
  document.getElementById("answer").value="";
 }
 document.getElementById("submitBtn").onclick=()=>{
  const answer=Number(document.getElementById("answer").value);
  if(answer===correct){
   score++;
   document.getElementById("score").textContent=`Score: ${score}`;
  }
  nextQuestion();
 };
 nextQuestion();
};
