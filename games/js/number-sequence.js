
window.Games = window.Games || {};
Games.numberSequence = function(container){
 const sequences=[
 {question:"2, 4, 6, 8, ?",answer:10},
 {question:"5, 10, 15, 20, ?",answer:25},
 {question:"1, 1, 2, 3, 5, ?",answer:8},
 {question:"10, 20, 30, 40, ?",answer:50}
 ];
 const item=sequences[Math.floor(Math.random()*sequences.length)];
 container.innerHTML=`<h2>🔢 Number Sequence</h2><h3>${item.question}</h3><input id="seqAnswer"><button id="checkBtn">Check</button><p id="result"></p>`;
 document.getElementById("checkBtn").onclick=()=>{
   const answer=Number(document.getElementById("seqAnswer").value);
   document.getElementById("result").textContent=answer===item.answer?"✅ Correct!":"❌ Try Again";
 };
};
