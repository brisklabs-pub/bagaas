
window.Games = window.Games || {};
Games.ticTacToe = function(container){
container.innerHTML=`<div class="ttt"><h3>Tic Tac Toe</h3><div id="board" style="display:grid;grid-template-columns:repeat(3,80px);gap:5px"></div><p id="status">X's turn</p></div>`;
let current='X', cells=Array(9).fill('');
const board=container.querySelector('#board'); const status=container.querySelector('#status');
function check(){const w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
for(const a of w){if(cells[a[0]]&&cells[a[0]]===cells[a[1]]&&cells[a[1]]===cells[a[2]]) return cells[a[0]];} return cells.every(Boolean)?'draw':null;}
for(let i=0;i<9;i++){let b=document.createElement('button'); b.style.height='80px'; b.onclick=()=>{if(cells[i])return; cells[i]=current;b.textContent=current; let r=check(); if(r){status.textContent=r==='draw'?'Draw!':r+' wins!';} else {current=current==='X'?'O':'X'; status.textContent=current+"'s turn";}}; board.appendChild(b);}
}
