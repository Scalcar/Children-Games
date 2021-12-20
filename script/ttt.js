let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let board = document.querySelector('#grid');
let winner = document.getElementById('winner');
const player = document.querySelector('#current-player');
let btn = document.querySelectorAll('.btn');

function showModal (description) {
    document.getElementById('modal-body-id').innerHTML = description;
    var MyModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    MyModal.show();
}

function draw() {
    let table = '';
        table += `
            <tr>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
            </tr>`;  
    return table;
}


for(i = 0;i < 3; i++) {
    board.innerHTML += draw();
}

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', mark);
    cell.style.backgroundColor = 'white';
});

function mark(e) {
    if(player.textContent === 'One') {
        e.target.classList.add('x','none');
        if(horizontalCheck() || verticalCheck() || diagonalCheck()) {
            document.getElementById('modal-body-id').classList.add('text-danger');
            winner.textContent = 'Player one is the winner!';
            winner.classList.add('text-danger');
            board.classList.add('none');
            return (showModal('Player one wins the game!'));
        }else if (drawCheck()) {
            winner.textContent = 'Game is a draw!';
            winner.classList.add('text-info');
            return (showModal('It is a draw. Lets play one more time!'));
        } else {
            player.textContent = 'Two';
            player.classList.remove('text-danger');
            player.classList.add('text-primary');
        }
    } else {
        e.target.classList.add('y','none');
        if(horizontalCheck() || verticalCheck() || diagonalCheck()) {
            document.getElementById('modal-body-id').classList.add('text-primary');
            winner.textContent = 'Player two is the winner!';
            winner.classList.add('text-primary');
            board.classList.add('none');
            return (showModal('Player two wins the game!'));
        }else if (drawCheck()) {
            winner.textContent = 'Game is a draw!';
            winner.classList.add('text-info');
            return (showModal('It is a draw. Lets play one more time!'));
        } else {
            player.textContent = 'One';
            player.classList.remove('text-primary');
            player.classList.add('text-danger'); 
        }
    }
}

function matchCheck(one,two,three) {
    if(one.classList.value == two.classList.value && one.classList.value == three.classList.value && one.classList.value != 'slot') {
        return true;
    }
}

function horizontalCheck() {
    for (let row = 0; row < tableRow.length; row++) {
        if (matchCheck(tableRow[row].cells[0], tableRow[row].cells[1], tableRow[row].cells[2])) {
            return true;
        } 
    }    
}

function verticalCheck() {
    for (let cell = 0; cell < tableRow.length; cell++) {
        if (matchCheck(tableRow[0].cells[cell], tableRow[1].cells[cell], tableRow[2].cells[cell])) {
            return true;
        }
    }
}

function diagonalCheck() {
    if (matchCheck(tableRow[0].cells[0], tableRow[1].cells[1], tableRow[2].cells[2]) || matchCheck(tableRow[0].cells[2], tableRow[1].cells[1], tableRow[2].cells[0])) {
        return true;
    }
}

function drawCheck() {
    let fullSlot = [];
    for(let i = 0; i < tableCell.length; i++) {
        if(tableCell[i].classList.value !== 'slot') {
            fullSlot.push(tableCell[i]);
        }
    }

    if(fullSlot.length === tableCell.length) {
        return true;
    }
}