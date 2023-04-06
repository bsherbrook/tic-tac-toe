const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const boxes = document.getElementsByClassName("box");

const gameBoard = document.getElementById("gameBoard");
let boardArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
for (i = 0; i < boardArray.length; i++) {
  for (j = 0; j < boardArray[i].length; j++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("id", `${i},${j}`);
    box.innerHTML = `${boardArray[i][j]}`;
    gameBoard.appendChild(box);
  }
}
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", handleClick);
}
let currentPlayer = "X";
let isGameOver = false;
let tieCheck;

function handleClick(event) {
  if (event.target.innerHTML !== "" || isGameOver) {
    return;
  }
  let boxId = event.target.id;
  let arrayIndex = boxId.split(",");
  boardArray[arrayIndex[0]][arrayIndex[1]] = currentPlayer;
  // place the marker
  event.target.innerHTML = currentPlayer;

  if (checkForWin()) {
    message.innerHTML = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  function checkForTie() {
    tieCheck = 0;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerHTML !== "") {
        tieCheck += 1;
      }
    }
  }
  checkForTie();
  if (tieCheck === 9) {
    message.innerHTML = "Call it a draw!";
    isGameOver = true;
  }
}
function checkForWin() {
  // check rows
  // for (let i = 0; i < 9; i += 3) {
  //   if (
  //     boxes[i].innerHTML === currentPlayer &&
  //     boxes[i + 1].innerHTML === currentPlayer &&
  //     boxes[i + 2].innerHTML === currentPlayer
  //   ) {
  //     return true;
  //   }
  // }
    for (let i=0; i<3; i++){
        if(boardArray[i][0] === currentPlayer &&
           boardArray[i][1] === currentPlayer &&
           boardArray[i][2] === currentPlayer){
          return true;
        }        
      }
    
  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      boxes[i].innerHTML === currentPlayer &&
      boxes[i + 3].innerHTML === currentPlayer &&
      boxes[i + 6].innerHTML === currentPlayer
    ){
      return true;
    }
  }
  //check diagonals
  for (let i = 0; i < 1; i++) {
    if (
      boxes[i].innerHTML == currentPlayer &&
      boxes[i + 4].innerHTML == currentPlayer &&
      boxes[i + 8].innerHTML == currentPlayer
    ) {
      return true;
    }
  }
  for (let i = 0; i < 1; i++) {
    if (
      boxes[i + 2].innerHTML == currentPlayer &&
      boxes[i + 4].innerHTML == currentPlayer &&
      boxes[i + 6].innerHTML == currentPlayer
    ) {
      return true;
    }
  }
}
// resets the board
resetButton.addEventListener("click", () => {
  boardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    message.innerHTML = "";
    isGameOver = false;
  }
});
