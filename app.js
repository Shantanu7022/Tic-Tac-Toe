let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#newGame-btn");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");
const Player_status = document.querySelector('.game_status');

let turnO = true; //Player O, Player X
let currentPlayer = "O";
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

function handlePlayerChange() {
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    Player_status.innerHTML = currentPlayerTurn();
}


const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        //console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            box.style.color = "blue"; // Change color for "O"
            turnO = false;

        } else {
            box.innerText = "X";
            box.style.color = "green"; // Change color for "X"
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        handlePlayerChange();
    });
});

const resetGame = () => {
    turnO = true;
    currentPlayer = "O";
    Player_status.innerHTML = currentPlayerTurn();
    enableBoxes();
    msgBox.classList.add("hide");
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Game is Over! Winner is ${winner}`;
    msgBox.classList.remove("hide");
    disableBoxes();
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                //console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }

    }
};


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
