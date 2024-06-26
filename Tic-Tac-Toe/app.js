let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false;

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

// Function to reset the game
const resetGame = () => {
    turnO = false;
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    reset.disabled = false; // Ensure the reset button is enabled when the game is reset
    reset.classList.remove("hide"); // Ensure the reset button is visible when the game is reset
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Function to display the winner message, disable the reset button, and hide it
const showWinner = (winner) => {
    msg.innerText = `Congratulations!!! ${winner} is the winner!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    reset.disabled = true; // Disable the reset button when a winner is found
    reset.classList.add("hide"); // Hide the reset button when a winner is found
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner", pos1val);
                showWinner(pos1val);
                return; // Stop checking if a winner is found
            }
        }
    }
};

// Event listeners for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (!box.innerText) { // Ensure box is empty before adding a new mark
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            turnO = !turnO; // Toggle turn
            checkWinner(); // Check for a winner after each turn
        }
    });
});

// Event listener for the reset button
reset.addEventListener("click", resetGame);

// Event listener for the new game button
newGameBtn.addEventListener("click", resetGame);
