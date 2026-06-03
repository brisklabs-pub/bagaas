
window.Games=window.Games||{};
Games.wordScramble=function(container){
const words=['COMPUTER','SCIENCE','MATH','SCHOOL','LEARNING'];
let word=words[Math.floor(Math.random()*words.length)];
let scrambled=word.split('').sort(()=>Math.random()-0.5).join('');
container.innerHTML=`<h3>Word Scramble</h3><p>${scrambled}</p><input id='w'><button id='c'>Check</button><p id='r'></p>`;
container.querySelector('#c').onclick=()=>container.querySelector('#r').textContent=container.querySelector('#w').value.toUpperCase()===word?'Correct!':'Try again';
}
