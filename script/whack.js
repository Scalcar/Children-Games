const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

function showModal (description) {
    document.getElementById('modal-body-id').innerHTML = description;
    var MyModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    MyModal.show();
}

let result = 0;
let currentTime = timeLeft.textContent;
let timerId = null;
let lastPosition;

function randomSquare() {
    squares.forEach(className => {
        className.classList.remove('mole');
    });

    const idx = Math.floor(Math.random() * 9);
    let randomPosition = squares[idx];

    if(randomPosition === lastPosition) {
        return randomSquare();
    }

    lastPosition = randomPosition;
    randomPosition.classList.add('mole');
    
    //asign the id of the randomPosition to hitPosition
    hitPosition = randomPosition.id;
}

squares.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result++;
            score.textContent = result;
            id.classList.remove('mole');
            if(currentTime === 0) {
                id.classList.add('mole');
                id.classList.add('none');
                result--;
                score.textContent = result;
            }
        }
    });
});



function moveMole() {
    //fixed time
    // timerId = setInterval(randomSquare, 1000);

    //random time
    timerId = setInterval(randomSquare,randomTime(1200,2500));
}

moveMole();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        showModal(`Congratulations! Your final score is  ${result}`);
    }
}

let countDownTimerId = setInterval(countDown, 1000);

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}






