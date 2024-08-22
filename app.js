let boxes = document.querySelectorAll(".btns");
let restart_btn = document.querySelector("#restart");
let reset_btn = document.querySelector(".reset-btn");
let replay_btn = document.querySelector("#replay");
let winner = document.querySelector(".winner");
let draw=document.querySelector(".draw");
let winner_msg = document.querySelector(".winner-msg");
let clickTune=new Audio("Audio Files/click.mp3");
let winnerTune=new Audio("Audio Files/congrats.mp3");
let drawTune=new Audio("Audio Files/draw.mp3");
let startTune=new Audio("Audio Files/gameStart.mp3");
let turnO = true;
let count = 0;
document.addEventListener('DOMContentLoaded', () => {
  startTune.play();
})
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    clickTune.play();
    if (turnO) {
      box.style.backgroundImage = "url(images/O.png)";
    } else {
      box.style.backgroundImage = "url(images/X.png)";
    }
    box.disabled = true;
    count++;
    if (checkWinner()) {
      showWinner(turnO ? "O" : "X");
    } else if (count === 9) {
      showWinner("None");
    }
    turnO = !turnO;
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.style.backgroundImage = ""; // Clear background image
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].style.backgroundImage;
    let pos2Val = boxes[pattern[1]].style.backgroundImage;
    let pos3Val = boxes[pattern[2]].style.backgroundImage;

    if (pos1Val && pos2Val && pos3Val) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        return true;
      }
    }
  }
  return false;
};

const showWinner = (winnerText) => {
  if (winnerText === "None") {
    draw.classList.remove("hide");
    drawTune.play();
  } else {
    winner_msg.innerText = `Player ${winnerText} Won!`;
    winner.classList.remove("hide");
    winnerTune.play();
  }
  
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  winner.classList.add("hide");
  draw.classList.add("hide");
  startTune.play();
};

reset_btn.addEventListener("click", resetGame);
replay_btn.addEventListener("click", resetGame);
restart_btn.addEventListener("click", resetGame);
