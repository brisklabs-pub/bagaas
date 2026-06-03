
window.Games = window.Games || {};
Games.hangman = function(container){
 const words=["SCIENCE","COMPUTER","MATH","SCHOOL","LEARNING"];
 const word=words[Math.floor(Math.random()*words.length)];
 let guessed=[];
 function render(){
  const display=word.split("").map(l=>guessed.includes(l)?l:"_").join(" ");
  container.innerHTML=`<h2>🎯 Hangman</h2><h3>${display}</h3><input id="letter" maxlength="1"><button id="guessBtn">Guess</button>`;
  document.getElementById("guessBtn").onclick=()=>{
   guessed.push(document.getElementById("letter").value.toUpperCase());
   render();
  };
 }
 render();
};
