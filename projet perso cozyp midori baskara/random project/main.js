let playerO="O";
let playerX="X";
let currPlayer=playerO;

//             0  1  2  3  4  5  6  7  8
let gameBoard=["","","","","","","","",""];
let gameCells;

// condition pour gagner
let winningConditions= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//bouton restart quand on perd
let gameOver=false;
let restartGameButton;

window.onload=function() {
    gameCells= document.getElementsByClassName("game-cell");
    for (let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }
    restartGameButton = this.document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);
}

function placeCell() {
    if(gameOver) {
        return;
    }

    const morpion = parseInt(this.getAttribute("data-cell-morpion"));
    if(gameBoard[morpion] !=""){
        return;
    }

    this.innerText = currPlayer;
    gameBoard[morpion]=currPlayer;

    //change de player
    currPlayer= (currPlayer== playerO) ? playerX : playerO;

    //check winner
    checkWinner();
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a == b && b == c && a != "") {

            for(let i = 0; i < gameBoard.length; i++) {
                if(winCondition.includes(i)) {
                    gameCells[i].classList.add("winning-game-cell");
                }
            }
            gameOver = true;
            return;
        }
    }
}

function restartGame() {
    gameOver= false;
    gameBoard= ["","","","","","","","",""];
    for (let cell of gameCells) {
        cell.innerText="";
        cell.classList.remove("winning-game-cell");
    }
}