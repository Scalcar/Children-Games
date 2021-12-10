let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let tableSlot = document.querySelector('.slot');
let board = document.querySelector('.game');
let winner = document.getElementById('winner');
const playerTurn = document.querySelector('#player-turn');

function showModal (description) {
    document.getElementById('modal-body-id').innerHTML = description;
    var MyModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    MyModal.show();
}

for(let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    })
}

player1Color = 'red';
player2Color = 'blue';

let currentPlayer = 1;
playerTurn.textContent = 'Player 1';
playerTurn.classList.add('badge','bg-danger');

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(e) {
    let column = e.target.cellIndex;
    let row = [];

    for (let i = 5; i > -1; i--) {
        if(tableRow[i].children[column].style.backgroundColor == 'white') {
            row.push(tableRow[i].children[column]);
            if(currentPlayer === 1) {
                row[0].style.backgroundColor = player1Color;
                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    board.classList.add('stop');
                    document.getElementById('modal-body-id').classList.add('text-danger');
                    winner.textContent = 'Player one is the winner!';
                    winner.classList.add('text-danger');
                    return (showModal('Player one wins the game!'));
                } else if(drawCheck()) {
                    winner.textContent = 'Game is a draw!';
                    winner.classList.add('text-info');
                    return (showModal('It is a draw. Lets play one more time!'));
                } else {
                    playerTurn.textContent = 'Player 2';
                    playerTurn.setAttribute('class','ms-2 badge bg-primary');
                    return currentPlayer = 2;
                }
            } else {
                row[0].style.backgroundColor = player2Color;
                playerTurn.textContent = 'Player 1';
                playerTurn.setAttribute('class','ms-2 badge bg-danger');
                if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
                    board.classList.add('stop');
                    document.getElementById('modal-body-id').classList.add('text-primary');
                    winner.textContent = 'Player two is the winner!';
                    winner.classList.add('text-primary');
                    return (showModal('Player two wins the game!'));
                } else if(drawCheck()) {
                    winner.textContent = 'Game is a draw!';
                    winner.classList.add('text-info');
                    return (showModal('It is a draw. Lets play one more time!'));
                } else {
                    playerTurn.textContent = 'Player 1';
                    playerTurn.setAttribute('class','ms-2 badge bg-danger');
                    return currentPlayer = 1;
                }
            }
        }
    }
}

function colorMatchCheck(one,two,three,four) {
    return (one === two && one === three && one === four && one !== 'white');
}

function horizontalCheck() {
    for(let row = 0; row < tableRow.length; row++) {
        for(let col = 0; col < 4; col++) {
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row].children[col+1].style.backgroundColor,
                tableRow[row].children[col+2].style.backgroundColor, tableRow[row].children[col+3].style.backgroundColor)) {
                    return true;
            }
        }
    }
}

function verticalCheck() {
    for(let col = 0; col < 7; col++) {
        for(let row = 0; row < 3; row++) {
            if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col].style.backgroundColor,
                tableRow[row+2].children[col].style.backgroundColor, tableRow[row+3].children[col].style.backgroundColor)) {
                    return true;
            }
        }
    }
}

function diagonalCheck1() {
    for(let col = 0; col < 4; col++) {
        for(let row = 0; row < 3; row++) {
           if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row+1].children[col+1].style.backgroundColor,
            tableRow[row+2].children[col+2].style.backgroundColor, tableRow[row+3].children[col+3].style.backgroundColor)) {
                return true;
            } 
        }
    }
}

function diagonalCheck2() {
    for(let col = 0; col < 4; col++) {
        for(let row = 5; row > 2; row--) {
           if(colorMatchCheck(tableRow[row].children[col].style.backgroundColor, tableRow[row-1].children[col+1].style.backgroundColor,
            tableRow[row-2].children[col+2].style.backgroundColor, tableRow[row-3].children[col+3].style.backgroundColor)) {
                return true;
            } 
        }
    }
}

function drawCheck() {
    let fullSlot = [];
    for(let i = 0; i < tableCell.length; i++) {
        if(tableCell[i].style.backgroundColor !== 'white') {
            fullSlot.push(tableCell[i]);
        }
    }

    if(fullSlot.length === tableCell.length) {
        return true;
    }
}
