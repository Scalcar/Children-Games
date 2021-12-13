let tableRow = document.getElementsByTagName('tr');
let tableCell = document.getElementsByTagName('td');
let board = document.querySelector('#grid');
const color = document.querySelector('#current-color');
let btn = document.querySelectorAll('.btn');

function draw() {
    let table = '';
        table += `
            <tr>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
                <td class="slot"></td>
            </tr>`;  
    return table;
}


for(i = 0;i < 20; i++) {
    board.innerHTML += draw();
}

for(let i = 0; i < tableCell.length; i++) {
    tableCell[i].addEventListener('click', (e) => {
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    })
}

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
});

function changeColor(e) {
    e.path[0].style.backgroundColor = color.innerHTML;
}

function setColor() {
    btn.forEach( (item) => {
        item.addEventListener('click', (i)=> {
            switch (i.path[0].id) {
                case 'black':
                    color.innerHTML = 'black';
                    color.style.color = 'black';
                    break;
                case 'white':
                    color.innerHTML = 'white';
                    color.style.color = 'black';
                    break;
                case 'red':
                    color.innerHTML = 'Red';
                    color.style.color = 'red';
                    break;
                case 'yellow':
                    color.innerHTML = 'yellow';
                    color.style.color = 'yellow';
                    break;
                case 'blue':
                    color.innerHTML = 'blue';
                    color.style.color = 'blue';
                    break;
                case 'green':
                    color.innerHTML = 'green';
                    color.style.color = 'green';
                    break;
                case 'pink':
                    color.innerHTML = 'pink';
                    color.style.color = 'pink';
                    break;
                case 'brown':
                    color.innerHTML = 'brown';
                    color.style.color = 'brown';
                    break;
                case 'orange':
                    color.innerHTML = 'orange';
                    color.style.color = 'orange';
                    break;
                case 'reset':
                    Array.prototype.forEach.call(tableCell, (cell) => {
                        cell.style.backgroundColor = 'white';
                    });
                break;
                default:
                    color.innerHTML = 'black';
                    color.style.color = 'black';
                    break;
            }
        });
    }); 
}





