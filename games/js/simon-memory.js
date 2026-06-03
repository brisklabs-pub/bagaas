
window.Games = window.Games || {};
Games.simonMemory = function(container){
 let sequence=[];
 for(let i=0;i<5;i++) sequence.push(Math.floor(Math.random()*4)+1);
 container.innerHTML=`<h2>🎵 Simon Memory</h2><p>Memorize: ${sequence.join(" - ")}</p><input id="memoryAnswer" placeholder="1 2 3 4 1"><button id="checkBtn">Check</button><p id="result"></p>`;
 document.getElementById("checkBtn").onclick=()=>{
  const value=document.getElementById("memoryAnswer").value.trim();
  document.getElementById("result").textContent=value===sequence.join(" ")?"✅ Excellent!":"❌ Not Quite";
 };
};
