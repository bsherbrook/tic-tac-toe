const board = document.getElementById('board');
const cells = board.getElementsByClassName('cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const boxes = document.getElementsByClassName('box');
let isTurn= true;

const createGameBoard = () => {
        const board = [
          [0,1,2],
          [3,4,5],
          [6,7,8]
        ];
      
        const getBoard = () => board;
      
        const updateBoard = (row, column, symbol) => {
          board[row][column] = symbol;
        };
      
        return {
          getBoard,
          updateBoard
        };
};
const gameBoard= createGameBoard();
gameBoard.updateBoard(0, 0, "X"); // Updates the top-left cell with "X"
gameBoard.updateBoard(1, 1, "O"); // Updates the center cell with "O"
      //make gameboard an array? 
const board2= document.getElementById('board2');
const boardArray = [
  ['','',''],
  ['','',''],
  ['','','']
];
for (i=0; i<boardArray.length; i++){
  for(j=0; j<boardArray[i].length; j++){
    let box= document.createElement('div');
    box.classList.add('box');
    box.setAttribute('id', `${i},${j}`)
    box.innerHTML=`${boardArray[i][j]}`
    board2.appendChild(box);
  }
}
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', handleClick);
}
let currentPlayer = 'X';
let isGameOver = false;
let tieCheck;
// initialize the board
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleClick);
}

function handleClick(event) {
  if (event.target.innerHTML !== '' || isGameOver) {
    return;
  }
  let boxId= event.target.id;
  let arrayIndex = boxId.split(',');
  boardArray[arrayIndex[0]][arrayIndex[1]]= currentPlayer;
 // place the marker
  if (isTurn){
     event.target.innerHTML = currentPlayer;
  }
  // check for a winner
  if (checkForWin()) {
    message.innerHTML = `Player ${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
  function checkForTie(){
    tieCheck=0;
    for (let i = 0; i < cells.length; i++){
        if (cells[i].innerHTML!==''){
            tieCheck+=1;
        }
    }
  }
  checkForTie();
  if (tieCheck===9){
    message.innerHTML = 'Call it a draw!'
    isGameOver= true;
  }
}
function checkForWin() {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (cells[i].innerHTML === currentPlayer &&
        cells[i+1].innerHTML === currentPlayer &&
        cells[i+2].innerHTML === currentPlayer) {
      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (cells[i].innerHTML === currentPlayer &&
        cells[i+3].innerHTML === currentPlayer &&
        cells[i+6].innerHTML === currentPlayer){
            return true;
        }
    }
  //check diagonals
  for (let i=0; i < 1; i++){
    if (cells[i].innerHTML == currentPlayer &&
        cells[i+4].innerHTML == currentPlayer &&
        cells[i+8].innerHTML == currentPlayer){
            return true;
        }
    }
  for (let i=0; i < 1; i++){
    if (cells[i+2].innerHTML == currentPlayer &&
        cells[i+4].innerHTML == currentPlayer &&
        cells[i+6].innerHTML == currentPlayer){
           return true;
        }
    }
}
// resets the board
resetButton.addEventListener('click', ()=>{
    for (let i = 0; i < cells.length; i++){  
        cells[i].innerHTML='';
        message.innerHTML='';
        isGameOver= false;
    }
})