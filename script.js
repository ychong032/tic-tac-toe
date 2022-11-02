const gameBoard = (() => {
    let array = [];
    for (let i = 0; i < 9; i++) {
        array.push(null);
    }
    const addToArray = (symbol, index) => array[index] = symbol;
    const getArray = () => array;
    const resetArray = () => {
        array = [];
        for (let i = 0; i < 9; i++) {
            array.push(null);
        }
    };
    return {addToArray, getArray, resetArray};
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

const displayController = (() => {
    const startButton = document.querySelector("#start-game");
    const restartButton = document.querySelector("#restart");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    const turnText = document.querySelector("#turn");
    const showMenu = () => {
        menu.style.display = "inline";
        overlay.style.display = "inline";
    };
    const hideMenu = () => {
        menu.style.display = "none";
        overlay.style.display = "none";
    };
    startButton.addEventListener('click', showMenu);
    overlay.addEventListener('click', (e) => {
        if (e.target !== menu) {
            hideMenu();
        }
    });
    const startGame = () => {
        hideMenu();
        window.startGame(player1.value, player2.value);
        startButton.style.display = "none";
        restartButton.style.display = "inline";
    };

    const endGame = winner => {
        if (winner) {
            turnText.textContent = `${winner} wins!`;
        } else {
            turnText.textContent = "It's a tie!";
        }
    }

    return {startGame, turnText, endGame, restartButton};
})();

const gameController = ((name1, name2) => {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const player1 = Player(name1, 'X');
    const player2 = Player(name2, 'O');
    let gameOver = false;
    let activePlayer = player1;
    let cellsMarked = 0;
    const checkGameOver = (index) => {
        let symbol = activePlayer.symbol;
        switch (index) {
            case 0:
                if ((gameBoard.getArray()[1] === symbol && gameBoard.getArray()[2] === symbol) || 
                    (gameBoard.getArray()[3] === symbol && gameBoard.getArray()[6] === symbol) || 
                    (gameBoard.getArray()[4] === symbol && gameBoard.getArray()[8] === symbol)) {
                    gameOver = true;
                }
                break;
            case 1:
                if ((gameBoard.getArray()[0] === symbol && gameBoard.getArray()[2] === symbol) || 
                    (gameBoard.getArray()[4] === symbol && gameBoard.getArray()[7] === symbol)) {
                    gameOver = true;
                }
                break;
            case 2:
                if ((gameBoard.getArray()[0] === symbol && gameBoard.getArray()[1] === symbol) || 
                    (gameBoard.getArray()[4] === symbol && gameBoard.getArray()[6] === symbol) || 
                    (gameBoard.getArray()[5] === symbol && gameBoard.getArray()[8] === symbol)) {
                    gameOver = true;
                }
                break;
            case 3:
                if ((gameBoard.getArray()[0] === symbol && gameBoard.getArray()[6] === symbol) || 
                    (gameBoard.getArray()[4] === symbol && gameBoard.getArray()[5] === symbol)) {
                    gameOver = true;
                }
                break;
            case 4:
                if ((gameBoard.getArray()[0] === symbol && gameBoard.getArray()[8] === symbol) || 
                    (gameBoard.getArray()[1] === symbol && gameBoard.getArray()[7] === symbol) || 
                    (gameBoard.getArray()[2] === symbol && gameBoard.getArray()[6] === symbol) ||
                    (gameBoard.getArray()[3] === symbol && gameBoard.getArray()[5] === symbol)) {
                    gameOver = true;
                }
                break;
            case 5:
                if ((gameBoard.getArray()[2] === symbol && gameBoard.getArray()[8] === symbol) || 
                    (gameBoard.getArray()[3] === symbol && gameBoard.getArray()[4] === symbol)) {
                    gameOver = true;
                }
                break;
            case 6:
                if ((gameBoard.getArray()[0] === symbol && gameBoard.getArray()[3] === symbol) || 
                    (gameBoard.getArray()[2] === symbol && gameBoard.getArray()[4] === symbol) || 
                    (gameBoard.getArray()[7] === symbol && gameBoard.getArray()[8] === symbol)) {
                    gameOver = true;
                }
                break;
            case 7:
                if ((gameBoard.getArray()[1] === symbol && gameBoard.getArray()[4] === symbol) || 
                    (gameBoard.getArray()[6] === symbol && gameBoard.getArray()[8] === symbol)) {
                    gameOver = true;
                }
                break;
            case 8:
                if ((gameBoard.getArray()[0] === symbol && gameBoard.getArray()[4] === symbol) || 
                    (gameBoard.getArray()[2] === symbol && gameBoard.getArray()[5] === symbol) || 
                    (gameBoard.getArray()[6] === symbol && gameBoard.getArray()[7] === symbol)) {
                    gameOver = true;
                }
                break;
            default:
                console.log("Something went wrong in game logic...");
        }
    }
    const markCell = e => {
        e.target.textContent = activePlayer.symbol;
        let index = parseInt(e.target.getAttribute("data-index"));
        gameBoard.addToArray(activePlayer.symbol, index);
        cellsMarked++;

        checkGameOver(index);
        if (gameOver) {
            let winner = activePlayer;
            console.log(`Player ${winner.name} wins!`);
            cells.forEach(item => item.removeEventListener('click', markCell));
            displayController.endGame(activePlayer.name);
        } else if (cellsMarked === 9) {
            console.log(`It's a tie!`);
            cells.forEach(item => item.removeEventListener('click', markCell));
            displayController.endGame(null);
        } else {
            activePlayer = activePlayer === player1 ? player2 : player1;
            displayController.turnText.textContent = `${activePlayer.name}'s turn.`;
        }
    };

    const resetGame = () => {
        cells.forEach(item => {
            item.textContent = '';
            item.addEventListener('click', markCell, {once: true});
        });
        cellsMarked = 0;
        gameBoard.resetArray();
        gameOver = false;
        activePlayer = player1;
        displayController.turnText.textContent = `${player1.name}'s turn.`;
    }

    const startGame = () => {
        cells.forEach(item => item.addEventListener('click', markCell, {once: true}));
        displayController.turnText.textContent = `${player1.name}'s turn.`;
        displayController.restartButton.addEventListener('click', resetGame);
    }

    return {startGame, resetGame};
});

function startGame(firstPlayerName, secondPlayerName) {
    let game = gameController(firstPlayerName, secondPlayerName);
    game.startGame();
}





