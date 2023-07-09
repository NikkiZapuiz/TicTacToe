//HTML element selector/a
const gameBoard = document.querySelector('#board');
const descriptionDisplay = document.querySelector('#description');
const startButton = document.querySelector('#startButton');
const playerNameForm = document.querySelector('#playerNameForm');
const playerNameInput = document.querySelector('#playerNameInput');
const submitNameButton = document.querySelector('#submitNameButton');



//hide name form and board
gameBoard.style.display = 'none';
playerNameForm.style.display = 'none';

startButton.addEventListener('click', showPlayerNameForm);
submitNameButton.addEventListener('click', startGame);

const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer;
let playerName;
let isGameActive = false;


//player name input
function showPlayerNameForm() {
    playerNameForm.style.display = '';
    startButton.style.display = 'none';
};

//start game
function startGame() {
    const backgroundMusic = document.querySelector('#backgroundMusic');
    backgroundMusic.play();
    playerName = playerNameInput.value.toUpperCase();
    if (playerName === '') {
        alert('Please enter your name!');
        return;
    };

    playerNameForm.style.display = 'none';
    descriptionDisplay.textContent = playerName + ' plays Cross';
    currentPlayer = 'cross';
    isGameActive = true;
    gameBoard.style.display = ''; // Show the game board
    resetBoard();
};

// create
function createBoard() {
    board.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            cellElement.addEventListener('click', () => makeMove(rowIndex, colIndex));
            gameBoard.appendChild(cellElement);
        });;
    });;
};

//reset
function resetBoard() {
    gameBoard.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            board[rowIndex][colIndex] = '';
        });;
    });;
    createBoard();
    startButton.disabled = false;
};

//player move
function makeMove(row, col) {

    if (!isGameActive || board[row][col] !== '') {
        return;
    };

    board[row][col] = currentPlayer;
    const cellElement = gameBoard.children[row * 3 + col];
    const symbolElement = document.createElement('div');
    symbolElement.classList.add(currentPlayer);
    cellElement.appendChild(symbolElement);

    if (checkWin(currentPlayer)) {
        descriptionDisplay.textContent = currentPlayer.toUpperCase() + ' wins!';
        endGame();
        return;
    };
    if (isBoardFull()) {
        descriptionDisplay.textContent = "It's a tie!";
        endGame();
        return;
    };

    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    descriptionDisplay.textContent = "It's " + currentPlayer.toUpperCase() + "'s turn";

    if (currentPlayer === 'circle') {
        makecircleMove();
    };
};

function checkWin(symbol) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] === symbol &&
            board[i][1] === symbol &&
            board[i][2] === symbol
        ) {
            return true;
        };
    };

    // Check columns
    for (let j = 0; j < 3; j++) {
        if (
            board[0][j] === symbol &&
            board[1][j] === symbol &&
            board[2][j] === symbol
        ) {
            return true;
        };
    };

    // Check diagonals
    if (
        board[0][0] === symbol &&
        board[1][1] === symbol &&
        board[2][2] === symbol
    ) {
        return true;
    };
    if (
        board[0][2] === symbol &&
        board[1][1] === symbol &&
        board[2][0] === symbol
    ) {
        return true;
    };

    return false;
};

//board checker
function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            };
        };
    };
    return true;
};

//Game end
function endGame() {
    const backgroundMusic = document.querySelector('#backgroundMusic');
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    isGameActive = false;
    startButton.style.display = '';
    startButton.addEventListener('click', startGame);
};

//Computer Move

function makecircleMove() {
    setTimeout(() => {
        // Check if the circle can win
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    // Simulate the move
                    board[i][j] = currentPlayer;
                    if (checkWin(currentPlayer)) {
                        // If circle can win, make the move
                        const cellElement = gameBoard.children[i * 3 + j];
                        const symbolElement = document.createElement('div');
                        symbolElement.classList.add(currentPlayer);
                        cellElement.appendChild(symbolElement);

                        descriptionDisplay.textContent = currentPlayer.toUpperCase() + ' wins!';
                        endGame();
                        return;
                    };
                    // Undo the move
                    board[i][j] = '';
                };
            };
        };

        // Check if the player can win in the next move then block
        const opponentSymbol = currentPlayer === 'cross' ? 'circle' : 'cross';
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    // Simulate the move
                    board[i][j] = opponentSymbol;
                    if (checkWin(opponentSymbol)) {
                        // The player can win, block move
                        board[i][j] = currentPlayer;
                        const cellElement = gameBoard.children[i * 3 + j];
                        const symbolElement = document.createElement('div');
                        symbolElement.classList.add(currentPlayer);
                        cellElement.appendChild(symbolElement);

                        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
                        descriptionDisplay.textContent = "It's " + currentPlayer.toUpperCase() + "'s turn";
                        return;
                    };
                    // Undo the move
                    board[i][j] = '';
                };
            };
        };

        // Choose a random move if no winning or blocking move needed
        while (true) {
            const randomRow = Math.floor(Math.random() * 3);
            const randomCol = Math.floor(Math.random() * 3);
            if (board[randomRow][randomCol] === '') {
                board[randomRow][randomCol] = currentPlayer;
                const cellElement = gameBoard.children[randomRow * 3 + randomCol];
                const symbolElement = document.createElement('div');
                symbolElement.classList.add(currentPlayer);
                cellElement.appendChild(symbolElement);

                if (checkWin(currentPlayer)) {
                    descriptionDisplay.textContent = currentPlayer.toUpperCase() + ' wins!';
                    endGame();
                    return;
                };
                if (isBoardFull()) {
                    descriptionDisplay.textContent = "It's a tie!";
                    endGame();
                    return;
                };

                currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
                descriptionDisplay.textContent = "It's " + currentPlayer.toUpperCase() + "'s turn";
                break;
            };
        };
    }, 500); // Delay
};

