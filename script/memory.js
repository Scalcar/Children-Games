// alert for matching result
function alert(message, type) {
    let wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert fw-bold py-4 alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close mt-2 d-none" data-bs-dismiss="alert" aria-label="Close" id="closeBtn"></button></div>';

    document.getElementById('test').innerHTML = wrapper.innerHTML;
}

function closeAlert() {
    document.getElementById('closeBtn').click();
}

function showModal (description) {
    document.getElementById('modal-body-id').innerHTML = description;
    var MyModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
    MyModal.show();
}

function restart() {
    document.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'beedrill',
            img: 'images/beedrill.png'
        },
        {
            name: 'blastoise',
            img: 'images/blastoise.png'
        },
        {
            name: 'bulbasaur',
            img: 'images/bulbasaur.png'
        },
        {
            name: 'charizard',
            img: 'images/charizard.png'
        },
        {
            name: 'charmander',
            img: 'images/charmander.png'
        },
        {
            name: 'charmeleon',
            img: 'images/charmeleon.png'
        },
        {
            name: 'ivysaur',
            img: 'images/ivysaur.png'
        },
        {
            name: 'pidgeot',
            img: 'images/pidgeot.png'
        },
        {
            name: 'pikachu',
            img: 'images/pikachu.png'
        },
        {
            name: 'venusaur',
            img: 'images/venusaur.png'
        },
        {
            name: 'squirtle',
            img: 'images/squirtle.png'
        },
        {
            name: 'wartortle',
            img: 'images/wartortle.png'
        },
        {
            name: 'butterfree',
            img: 'images/butterfree.png'
        },
        {
            name: 'caterpie',
            img: 'images/caterpie.png'
        },
        {
            name: 'metapod',
            img: 'images/metapod.png'
        },
        {
            name: 'kakuna',
            img: 'images/kakuna.png'
        },
        {
            name: 'pidgeotto',
            img: 'images/pidgeotto.png'
        },
        {
            name: 'pidgey',
            img: 'images/pidgey.png'
        },
        {
            name: 'weedle',
            img: 'images/weedle.png'
        },
        {
            name: 'arbok',
            img: 'images/arbok.png'
        },
        {
            name: 'ekans',
            img: 'images/ekans.png'
        },
        {
            name: 'fearow',
            img: 'images/fearow.png'
        },
        {
            name: 'nidoran',
            img: 'images/nidoran.png'
        },
        {
            name: 'nidorina',
            img: 'images/nidorina.png'
        },
        {
            name: 'nidorino',
            img: 'images/nidorino.png'
        },
        {
            name: 'raichu',
            img: 'images/raichu.png'
        },
        {
            name: 'raticate',
            img: 'images/raticate.png'
        },
        {
            name: 'rattata',
            img: 'images/rattata.png'
        },
        {
            name: 'sandshrew',
            img: 'images/sandshrew.png'
        },
        {
            name: 'sandslash',
            img: 'images/sandslash.png'
        },
        {
            name: 'spearow',
            img: 'images/spearow.png'
        },
        {
            name: 'nidoqueen',
            img: 'images/nidoqueen.png'
        },
        {
            name: 'nidoking',
            img: 'images/nidoking.png'
        }
    ];

    const pickCards = cardArray
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value).slice(0,8);

    let list = pickCards.concat(pickCards);
    
    const decks = list
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // cardArray.sort(() => Math.random() - 0.5)

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let cardCount = [];

    //create your board
    function createBoard() {
        for (let i = 0; i < decks.length; i++) {
            let card = document.createElement('img');
            card.setAttribute('src', 'images/pokeball.png');
            card.setAttribute('data-id', i);
            card.setAttribute('class','border border-dark rounded p-2');
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    //check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1] && cardsWon.length === (decks.length/2-1)) {
            cardsWon.push(cardsChosen);
            showModal('Congratulations! You found them all!');
            document.getElementById('restartBtn').classList.remove('d-none');
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match.','success');
            setTimeout(closeAlert, 1500);
            // if you want the cards to disappear
            // cards[optionOneId].setAttribute('src', 'images/white.png');
            // cards[optionTwoId].setAttribute('src', 'images/white.png');
            cardsWon.push(cardsChosen);
            cards[optionOneId].setAttribute('style', 'pointer-events: none');
            cards[optionTwoId].setAttribute('style', 'pointer-events: none');
            grid.setAttribute('style', 'pointer-events: unset');
        } else {
            cards[optionOneId].setAttribute('src', 'images/pokeball.png');
            cards[optionTwoId].setAttribute('src', 'images/pokeball.png');
            alert('Sorry. Try again!', 'danger');
            setTimeout(closeAlert, 1500);
            grid.setAttribute('style', 'pointer-events: unset');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        // if (cardsWon.length === decks.length/2) {
        //     resultDisplay.textContent = 'Congratulations! You found them all!';
        //     showModal('Congratulations! You found them all!');
        // }
    }


    //flip your card
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        let count = document.querySelector('#count');
        cardsChosen.push(decks[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', decks[cardId].img);
        if (cardsChosen.length === 2) {
            cardCount.push('clicked');
            grid.setAttribute('style', 'pointer-events: none');
            setTimeout(checkForMatch, 600);
            count.textContent = cardCount.length;
        }
    }


    createBoard();
    
});
