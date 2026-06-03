
window.Games=window.Games||{};
Games.mathBattle=function(container){
let hp=100,mhp=100,ans=0;
container.innerHTML=`<h3>Math Battle</h3><p id='stats'></p><p id='q'></p><input id='a'><button id='go'>Attack</button>`;
const stats=container.querySelector('#stats'), q=container.querySelector('#q');
function nq(){let x=Math.floor(Math.random()*20)+1,y=Math.floor(Math.random()*20)+1; ans=x+y; q.textContent=`${x}+${y}=?`; stats.textContent=`You: ${hp} HP | Monster: ${mhp} HP`; }
container.querySelector('#go').onclick=()=>{if(+container.querySelector('#a').value===ans){mhp-=20;} else hp-=15; if(mhp<=0){alert('Victory!');return;} if(hp<=0){alert('Defeat!');return;} nq();};
nq();
}
