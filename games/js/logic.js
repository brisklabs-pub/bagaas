// Memory Match Game Logic
function startMemoryGame() {
    const symbols = [
        "🍎", "🍎",
        "🐶", "🐶",
        "🚗", "🚗",
        "⭐", "⭐",
        "📚", "📚",
        "🎵", "🎵",
        "🌈", "🌈",
        "⚽", "⚽"
    ];

    symbols.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('memoryGrid');
    const timerElement = document.getElementById('timer');
    const matchesElement = document.getElementById('matches');

    grid.innerHTML = '';

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;
    let timeLeft = 60;

    const timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document
                .querySelectorAll('.memory-card')
                .forEach(card => card.style.pointerEvents = 'none');
            setTimeout(() => {
                alert('⏰ Time Up!');
            }, 300);
        }

    }, 1000);

    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.innerHTML = `
            <div class="memory-card-front">?</div>
            <div class="memory-card-back">${symbol}</div>
        `;
        card.addEventListener('click', () => {
            if (
                lockBoard ||
                card.classList.contains('memory-matched') ||
                card === firstCard
            ) {
                return;
            }

            card.classList.add('memory-flipped');

            if (!firstCard) {
                firstCard = card;
                return;
            }

            secondCard = card;

            lockBoard = true;

            if (
                firstCard.dataset.symbol ===
                secondCard.dataset.symbol
            ) {

                firstCard.classList.add('memory-matched');
                secondCard.classList.add('memory-matched');

                matches++;

                matchesElement.textContent = matches;

                firstCard = null;
                secondCard = null;
                lockBoard = false;

                if (matches === 8) {

                    clearInterval(timer);

                    setTimeout(() => {
                        alert(
                            `🎉 Congratulations!\nYou won with ${timeLeft} seconds remaining!`
                        );
                    }, 300);
                }

            } else {

                setTimeout(() => {

                    firstCard.classList.remove('memory-flipped');
                    secondCard.classList.remove('memory-flipped');

                    firstCard = null;
                    secondCard = null;

                    lockBoard = false;

                }, 800);
            }

        });

        grid.appendChild(card);

    });

}
function loadMemoryMatch() {

    const gameContainer =
        document.getElementById('gameContainer');

    const title =
        document.getElementById('currentGameTitle');

    title.textContent = '🧠 Memory Match';

    gameContainer.innerHTML = `
        <div class="memory-game">

            <div class="memory-header">

                <span>
                    ⏱️ <span id="timer">60</span>s
                </span>

                <span>
                    ✅ <span id="matches">0</span>/8
                </span>

            </div>

            <div
                class="memory-grid"
                id="memoryGrid">
            </div>

            <button
                class="game-btn"
                onclick="loadMemoryMatch()">
                Restart
            </button>

        </div>
    `;

    startMemoryGame();
}

// Tic Tac Toe Game Logic
function loadTicTacToe() {

    const gameContainer =
        document.getElementById('gameContainer');

    const title =
        document.getElementById('currentGameTitle');

    title.textContent = '⭕ Tic Tac Toe';

    gameContainer.innerHTML = `
        <div class="tictactoe-game">

            <div
                class="tictactoe-status"
                id="tictactoeStatus">
                Player X's Turn
            </div>

            <div
                class="tictactoe-board"
                id="tictactoeBoard">

                <div class="tictactoe-cell" data-index="0"></div>
                <div class="tictactoe-cell" data-index="1"></div>
                <div class="tictactoe-cell" data-index="2"></div>

                <div class="tictactoe-cell" data-index="3"></div>
                <div class="tictactoe-cell" data-index="4"></div>
                <div class="tictactoe-cell" data-index="5"></div>

                <div class="tictactoe-cell" data-index="6"></div>
                <div class="tictactoe-cell" data-index="7"></div>
                <div class="tictactoe-cell" data-index="8"></div>

            </div>

            <button
                class="game-btn"
                onclick="loadTicTacToe()">
                Restart Game
            </button>

        </div>
    `;

    startTicTacToe();
}
function startTicTacToe() {

    let currentPlayer = 'X';

    let board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    let gameOver = false;

    const status =
        document.getElementById(
            'tictactoeStatus'
        );

    const cells =
        document.querySelectorAll(
            '.tictactoe-cell'
        );

    const winPatterns = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];

    function checkWinner() {

        for (const pattern of winPatterns) {

            const [a, b, c] = pattern;

            if (
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {

                gameOver = true;

                status.textContent =
                    `🎉 Player ${board[a]} Wins!`;

                return true;
            }
        }

        if (!board.includes('')) {

            gameOver = true;

            status.textContent =
                '🤝 Draw Game';

            return true;
        }

        return false;
    }

    cells.forEach(cell => {

        cell.addEventListener('click', () => {

            const index =
                cell.dataset.index;

            if (
                board[index] ||
                gameOver
            ) {
                return;
            }

            board[index] =
                currentPlayer;

            cell.textContent =
                currentPlayer;

            if (checkWinner()) {
                return;
            }

            currentPlayer =
                currentPlayer === 'X'
                    ? 'O'
                    : 'X';

            status.textContent =
                `Player ${currentPlayer}'s Turn`;

        });

    });

}

// Sudoku Mini Game Logic
let sudokuSolution = [];
function loadSudokuMini() {

    const gameContainer =
        document.getElementById('gameContainer');

    const title =
        document.getElementById('currentGameTitle');

    title.textContent = '🧩 Sudoku Mini';

    gameContainer.innerHTML = `
        <div class="sudoku-game">

            <p class="sudoku-instructions">
                Fill each row, column, and box with numbers 1-4.
            </p>

            <div
                class="sudoku-grid"
                id="sudokuGrid">
            </div>

            <div class="game-actions">

                <button
                    class="game-btn"
                    onclick="checkSudoku()">
                    Check Answer
                </button>

                <button
                    class="game-btn"
                    onclick="loadSudokuMini()">
                    New Puzzle
                </button>

            </div>

            <div
                class="sudoku-message"
                id="sudokuMessage">
            </div>

        </div>
    `;

    startSudokuMini();
}
function startSudokuMini() {

    const puzzle = [
        [1, '', '', 4],
        ['', 4, 1, ''],
        [2, '', '', 3],
        ['', 3, 2, '']
    ];

    sudokuSolution = [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1]
    ];

    const grid =
        document.getElementById(
            'sudokuGrid'
        );

    grid.innerHTML = '';

    puzzle.forEach((row, rowIndex) => {

        row.forEach((value, colIndex) => {

            const cell =
                document.createElement('input');

            cell.className =
                'sudoku-cell';

            cell.maxLength = 1;

            if (value !== '') {

                cell.value = value;
                cell.disabled = true;

                cell.classList.add(
                    'sudoku-cell-fixed'
                );

            } else {

                cell.dataset.row =
                    rowIndex;

                cell.dataset.col =
                    colIndex;

            }

            grid.appendChild(cell);

        });

    });

}
function checkSudoku() {

    const cells =
        document.querySelectorAll(
            '.sudoku-cell'
        );

    let correct = true;

    cells.forEach(cell => {

        if (cell.disabled) return;

        const row =
            parseInt(
                cell.dataset.row
            );

        const col =
            parseInt(
                cell.dataset.col
            );

        const expected =
            sudokuSolution[row][col];

        if (
            parseInt(cell.value) !== expected
        ) {
            correct = false;
        }

    });

    const message =
        document.getElementById(
            'sudokuMessage'
        );

    if (correct) {

        message.innerHTML =
            '🎉 Correct! Well Done!';

        message.style.color =
            'green';

    } else {

        message.innerHTML =
            '❌ Some answers are incorrect.';

        message.style.color =
            'red';
    }

}

// Patter Puzzle Game Logic
const patternQuestions = [
    {
        pattern: "2, 4, 6, ?, 10",
        options: ["7", "8", "9", "12"],
        answer: "8"
    },
    {
        pattern: "5, 10, 15, ?, 25",
        options: ["18", "20", "22", "30"],
        answer: "20"
    },
    {
        pattern: "1, 3, 5, ?, 9",
        options: ["6", "7", "8", "10"],
        answer: "7"
    },
    {
        pattern: "10, 20, 30, ?, 50",
        options: ["35", "40", "45", "60"],
        answer: "40"
    },
    {
        pattern: "A, C, E, ?, I",
        options: ["F", "G", "H", "J"],
        answer: "G"
    }
];
function loadPatternPuzzle() {
    const gameContainer = document.getElementById('gameContainer');
    const title = document.getElementById('currentGameTitle');
    title.textContent = '🔷 Pattern Puzzle';
    gameContainer.innerHTML = `
        <div class="patternpuzzle-game">

            <div class="patternpuzzle-score">
                Score:
                <span id="patternScore">0</span>
            </div>

            <div
                class="patternpuzzle-question"
                id="patternQuestion">
            </div>

            <div
                class="patternpuzzle-options"
                id="patternOptions">
            </div>

            <div
                class="patternpuzzle-message"
                id="patternMessage">
            </div>

            <div class="game-actions">

                <button
                    class="game-btn"
                    onclick="loadPatternPuzzle()">
                    Restart Game
                </button>

            </div>

        </div>
    `;

    startPatternPuzzle();
}