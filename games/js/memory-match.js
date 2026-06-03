
window.Games=window.Games||{};
Games.memoryMatch=function(container){
let vals=['A','A','B','B','C','C','D','D'].sort(()=>Math.random()-0.5);
container.innerHTML='<h3>Memory Match</h3><div id="g" style="display:grid;grid-template-columns:repeat(4,70px);gap:5px"></div>';
let first=null, lock=false; const g=container.querySelector('#g');
vals.forEach(v=>{let b=document.createElement('button'); b.textContent='?'; b.style.height='70px'; b.onclick=()=>{if(lock||b.dataset.done)return; b.textContent=v; if(!first){first={b,v};return;} if(first.v===v){b.dataset.done=1; first.b.dataset.done=1; first=null;} else {lock=true; let fb=first.b; setTimeout(()=>{b.textContent='?'; fb.textContent='?'; first=null; lock=false;},700);} }; g.appendChild(b);});
}
