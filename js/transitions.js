const imageses = [
  'images/Alfa-romeo.jpeg',
  'images/Ford.jpeg',
  'images/Mazda.jpeg',
  'images/Nissan.jpeg',
  'images/Peugeot.jpeg',
];

const cardDeck = [...imageses, ...imageses];
const duration = 600;
let winCount = 0;
let firstOpenCard = null;
let isBlock = false;
const pointsWon = imageses.length;
const gameBoard = document.getElementById('cards_block');

function getingSortList() {
  cardDeck.sort(function () {
    return 0.5 - Math.random();
  });
}

const putImgsInCards = function () {
  cardDeck.forEach(function (value) {
    template = `
        <div class="card">
            <img class='front front-images' src='images/cardClosed.png' alt='front-card'>
            <img class='back back__image' src='${value}' alt='back-card'>
        </div>         
      `;
    gameBoard.insertAdjacentHTML('beforeEnd', template);
  });
};

const overturnsCard = function () {
  gameBoard.addEventListener('click', function ({ target }) {
    let check = [];
    if (target.nodeName !== 'DIV') {
      return;
    }

    for (let x = 0; x < gameBoard.childElementCount; x++) {
      if (gameBoard.children[x].className === 'card__clicked') {
        check.push(gameBoard.children[x].className);
      }
    }

    if (check.length === 2) {
      return;
    }

    if (target.classList.contains('card__clicked')) {
      target.classList.remove('card__clicked');
      target.classList.add('card');
    } else if (target.classList.contains('card')) {
      target.classList.remove('card');
      target.classList.add('card__clicked');
    }

    compareImgs();
    checkWin();
  });
};

const comparison = document.createDocumentFragment();
const compareImgs = function () {
  comparison.appendChild(gameBoard);

  const cardsImg = gameBoard.children;
  const checkImg = [];

  for (let x = 0; x < cardsImg.length; x++) {
    if (cardsImg[x].childElementCount === 0) {
      cardsImg[x].delete;
    }
    if (cardsImg[x].classList.contains('card__clicked')) {
      if (cardsImg[x].childElementCount !== 0) {
        checkImg.push(cardsImg[x]);
      }
    }
  }

  if (checkImg.length === 2) {
    const firstImg = checkImg[0].firstChild;
    const secondImg = checkImg[1].firstChild;

    if (firstImg.src === secondImg.src) {
      timer = setTimeout(function () {
        firstImg.remove();
        checkImg[0].classList.remove('card__clicked');
        secondImg.remove();
        checkImg[1].classList.remove('card__clicked');
      }, 400);
      winCount++;
    }

    if (firstImg.src !== secondImg.src) {
      timer = setTimeout(function () {
        checkImg[0].classList.replace('card__clicked', 'card');
        checkImg[1].classList.replace('card__clicked', 'card');
      }, 400);
    }
  }
  document.querySelector('main').appendChild(gameBoard);
};

function checkWin() {
  if (winCount === pointsWon) {
    setTimeout(function () {
      alert('You are the winner!');
    }, duration);
  }
}

function InitGame() {
  getingSortList();
  putImgsInCards();
  overturnsCard();
}

InitGame();
