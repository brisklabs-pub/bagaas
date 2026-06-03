
window.Games = window.Games || {};
Games.sudokuMini = function(container){
 container.innerHTML=`<h2>🧩 Sudoku Mini</h2>
 <table style="margin:auto;border-collapse:collapse">
 <tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>
 <tr><td>3</td><td>4</td><td>1</td><td>2</td></tr>
 <tr><td>2</td><td>1</td><td>4</td><td>3</td></tr>
 <tr><td>4</td><td>3</td><td>2</td><td>1</td></tr>
 </table>
 <p>Phase 4: Generate random puzzles.</p>`;
};
