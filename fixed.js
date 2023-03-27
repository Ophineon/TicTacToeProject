
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
//THIS ARRAY LISTS THE COMBINATIONS OF INPUTS ON THE BOARD THAT ALLOW
//THE GET WINNER FUNCTION TO DETERMINE VICTORY! 

let board;
let turn = 'X';
let win;

//these are variables that can be changed

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', turnChange);
//when a click occurs on the board, the turnchange function occurs
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);
//the reset button is clicked, the board returns to the initial state


function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
};
// checks the winning combo arrays to determine who is victorius or 
// if there is a tie
function turnChange() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    //is it X's turn? if yes it becomes O if not it becomes X
    win = getWinner();
    render();
};
// after a part of the board is clicked the turn shifts to the other player
// it also calls to check if a winner has appeared
function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();
};
/* This function reprents the board as an array that text can be entered into
*/
function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `A draw? Run it back` : win ? `${win} wins!` : `It's ${turn}'s turn!`;
    };

init();
//this function checks the state of the board after each move
// then when it is called within other functions it outputs a message
// related to the board state like victories and turns