
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const gameCards = document.querySelectorAll('.game-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn =>
                btn.classList.remove('active')
            );

            button.classList.add('active');

            // Selected category
            const selectedCategory = button.dataset.category;

            // Filter cards
            gameCards.forEach(card => {

                const categories =
                    card.dataset.category.split(' ');

                const shouldShow =
                    selectedCategory === 'all' ||
                    categories.includes(selectedCategory);

                card.style.display =
                    shouldShow ? 'block' : 'none';
            });

        });

    });
});

function loadGame(game) {
    switch (game) {
        case 'memoryMatch':
            loadMemoryMatch();
            break;
        case 'ticTacToe':
            loadTicTacToe();
            break;
        case 'sudokuMini':
            loadSudokuMini();
            break;
        case 'patternPuzzle':
            loadPatternPuzzle();
            break;
        case 'mazeEscape':
            loadMazeEscape();
            break;
        default:
            alert('Game Coming Soon!');
    }
}
let patternScore = 0;
let patternIndex = 0;
let patternGameQuestions = [];

function startPatternPuzzle() {
    patternScore = 0;
    patternIndex = 0;
    patternGameQuestions =
        [...patternQuestions]
            .sort(() => Math.random() - 0.5);
    showPatternQuestion();
}

function showPatternQuestion() {
    if (patternIndex >= patternGameQuestions.length) {
        document.getElementById('patternQuestion').innerHTML =`🎉 Finished! Final Score: ${patternScore}`;
        document.getElementById('patternOptions').innerHTML = '';
        return;
    }

    const question = patternGameQuestions[patternIndex];
    document.getElementById('patternQuestion').textContent = question.pattern;
    document.getElementById('patternMessage').textContent = '';
    const optionsContainer =
        document.getElementById(
            'patternOptions'
        );

    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'patternpuzzle-option';
        button.textContent = option;
        button.addEventListener('click', () => {
                if (option === question.answer) {
                    patternScore++;
                    document.getElementById('patternMessage').textContent = '✅ Correct!';

                } else {
                    document.getElementById('patternMessage').textContent = `❌ Correct Answer: ${question.answer}`;
                }
                document.getElementById('patternScore').textContent = patternScore;
                setTimeout(() => {
                    patternIndex++;
                    showPatternQuestion();
                }, 1200);
            }
        );
        optionsContainer.appendChild(button);

    });
}

// Maze Escape Game Logic
let mazePlayer = {row: 0, col: 0 };
const mazeMap = [
    ['S', '.', '#', '.', '.'],
    ['#', '.', '#', '.', '#'],
    ['.', '.', '.', '.', '#'],
    ['.', '#', '#', '.', '.'],
    ['.', '.', '.', '#', 'E']
];

function loadMazeEscape() {
    const gameContainer = document.getElementById('gameContainer');
    const title = document.getElementById('currentGameTitle');
    title.textContent = '🌀 Maze Escape';
    mazePlayer = { row: 0, col: 0 };

    gameContainer.innerHTML = `
        <div class="mazeescape-game">
            <div class="mazeescape-info">
                Reach the 🏁 Exit
            </div>
            <div class="mazeescape-grid" id="mazeGrid">
            </div>

            <div class="mazeescape-controls">
                <button class="mazeescape-btn" onclick="moveMazePlayer(-1,0)">
                    ⬆️
                </button>
                <div>
                    <button
                        class="mazeescape-btn"
                        onclick="moveMazePlayer(0,-1)">
                        ⬅️
                    </button>

                    <button
                        class="mazeescape-btn"
                        onclick="moveMazePlayer(0,1)">
                        ➡️
                    </button>

                </div>

                <button
                    class="mazeescape-btn"
                    onclick="moveMazePlayer(1,0)">
                    ⬇️
                </button>

            </div>

            <div class="game-actions">

                <button
                    class="game-btn"
                    onclick="loadMazeEscape()">
                    Restart Maze
                </button>

            </div>

        </div>
    `;

    renderMaze();

    document.addEventListener(
    'keydown',
    (event) => {

        switch(event.key) {

            case 'ArrowUp':
                moveMazePlayer(-1,0);
                break;

            case 'ArrowDown':
                moveMazePlayer(1,0);
                break;

            case 'ArrowLeft':
                moveMazePlayer(0,-1);
                break;

            case 'ArrowRight':
                moveMazePlayer(0,1);
                break;
        }

    }
);
}

function renderMaze() {

    const grid =
        document.getElementById('mazeGrid');

    grid.innerHTML = '';

    mazeMap.forEach((row, rowIndex) => {

        row.forEach((cell, colIndex) => {

            const tile =
                document.createElement('div');

            tile.className =
                'mazeescape-tile';

            if (
                mazePlayer.row === rowIndex &&
                mazePlayer.col === colIndex
            ) {

                tile.classList.add(
                    'mazeescape-player'
                );

                tile.textContent = '😀';

            } else if (cell === '#') {

                tile.classList.add(
                    'mazeescape-wall'
                );

            } else if (cell === 'E') {

                tile.classList.add(
                    'mazeescape-exit'
                );

                tile.textContent = '🏁';

            } else if (cell === 'S') {

                tile.textContent = '🟩';

            }

            grid.appendChild(tile);

        });

    });

}

function moveMazePlayer(rowMove, colMove) {

    const newRow =
        mazePlayer.row + rowMove;

    const newCol =
        mazePlayer.col + colMove;

    if (
        newRow < 0 ||
        newRow >= mazeMap.length ||
        newCol < 0 ||
        newCol >= mazeMap[0].length
    ) {
        return;
    }

    if (
        mazeMap[newRow][newCol] === '#'
    ) {
        return;
    }

    mazePlayer.row = newRow;
    mazePlayer.col = newCol;

    renderMaze();

    if (
        mazeMap[newRow][newCol] === 'E'
    ) {

        setTimeout(() => {

            alert(
                '🎉 Congratulations!\nYou escaped the maze!'
            );

        }, 200);
    }

}