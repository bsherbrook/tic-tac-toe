const message = document.getElementById("message");
const boxes = document.getElementsByClassName("box");

const createGameBoard = () => {
  const gameBoard = document.getElementById("gameBoard");
  const resetButton = document.getElementById("reset");
  
  let boardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  
  function getBoard(a,b){
    return boardArray[a][b]
  };
  
  const updateBoard = (row, column, symbol) => {
    boardArray[row][column] = symbol;
  };
  //build id tags and listeners for the board
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
  
  // reset the board
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
  return {getBoard, updateBoard};
};

const game = createGameBoard();
let isGameOver = false;
let currentPlayer = "X";

function handleClick(event) {
  if (event.target.innerHTML !== "" || isGameOver) {
    return;
  }
  // place the marker
  let arrayIndex = event.target.id.split(",");
  game.updateBoard(arrayIndex[0], arrayIndex[1], currentPlayer);
  event.target.innerHTML = currentPlayer;

  if (checkForWin()) {
    message.innerHTML = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  let tieCheck;
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
  const boardArray= game.getBoard;
  for (let i = 0; i < 3; i++) {
    if (
      boardArray(i,0) === currentPlayer &&
      boardArray(i,1) === currentPlayer &&
      boardArray(i,2) === currentPlayer
    ) {
      return true;
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      boardArray(0,i) === currentPlayer &&
      boardArray(1,i) === currentPlayer &&
      boardArray(2,i) === currentPlayer
    ) {
      return true;
    }
  }
  // check diagonals
  if (
    boardArray(0,0) == currentPlayer &&
    boardArray(1,1) == currentPlayer &&
    boardArray(2,2) == currentPlayer
  ) {
    return true;
  }
  if (
    boardArray(0,2) == currentPlayer &&
    boardArray(1,1) == currentPlayer &&
    boardArray(2,0) == currentPlayer
  ) {
    return true;
  }
}
// resets the board
