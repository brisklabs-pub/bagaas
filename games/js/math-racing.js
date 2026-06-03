
window.Games=window.Games||{};
Games.mathRacing=function(container){
container.innerHTML=`<h3>Math Racing</h3><div style="background:#ddd;height:30px"><div id="car" style="background:green;height:30px;width:0%"></div></div><p id="q"></p><input id="a"><button id="s">Submit</button>`;
let progress=0,ans=0; const q=container.querySelector('#q');
function nq(){let x=Math.floor(Math.random()*12)+1,y=Math.floor(Math.random()*12)+1; ans=x*y; q.textContent=`${x} × ${y} = ?`; container.querySelector('#a').value='';}
container.querySelector('#s').onclick=()=>{if(+container.querySelector('#a').value===ans){progress+=10;container.querySelector('#car').style.width=progress+'%'; if(progress>=100){alert('You win!');} } nq();};
nq();
}
