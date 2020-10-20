const arrCards = [
  '/images/Alfa-romeo.jpeg',
  '/images/Ford.jpeg',
  '/images/Mazda.jpeg',
  '/images/Nissan.jpeg',
  '/images/Peugeot.jpeg',
];
//my random array with my img
const doubleCards = arrCards.concat(arrCards);

doubleCards.sort(function () {
  return 0.5 - Math.random();
});

const cards = document.querySelector('main');
const noClicked = cards.getElementsByClassName('card');

//this func must added img in all my cards
const createImgs = function (arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    let img = document.createElement('img');
    img.src = arr2[i];
    arr1[i].appendChild(img);
  }
};
// this function flips the cards
const overturnsCard = function () {
  cards.addEventListener('click', function (event) {
    let target = event.target;

    if (target.nodeName !== 'DIV') {
      return;
    }

    if (target.classList.contains('card__clicked') === true) {
      target.classList.remove('card__clicked');
      target.classList.add('card');
    } else if (target.classList.contains('card') === true) {
      target.classList.remove('card');
      target.classList.add('card__clicked');
    }

    compareImgs(cardImg);
  });
};

const cardImg = cards.children;
const fragmentMain = document
  .createDocumentFragment()
  .appendChild(document.createElement('div'));

// this func compares two showed img
const compareImgs = function (arrImg) {
  fragmentMain.appendChild(cards);
  const arrCheckImg = [];

  for (let x = 0; x < arrImg.length; x++) {
    if (arrImg[x].childElementCount === 0) {
      arrImg[x].delete;
    }
    if (arrImg[x].classList.contains('card__clicked') === true) {
      if (arrImg[x].childElementCount !== 0) {
        arrCheckImg.push(arrImg[x]);
      }
    }
  }
  // if opened two cards

  if (arrCheckImg.length === 2) {
    const firstImg = arrCheckImg[0].firstChild;
    const secondImg = arrCheckImg[1].firstChild;

    if (firstImg.src === secondImg.src) {
      setTimeout(function () {
        firstImg.remove();
        arrCheckImg[0].classList.remove('card__clicked');
        secondImg.remove();
        arrCheckImg[1].classList.remove('card__clicked');
      }, 500);
    }

    if (firstImg.src !== secondImg.src) {
      setTimeout(function () {
        arrCheckImg[0].classList.remove('card__clicked');
        arrCheckImg[0].classList.add('card');
        arrCheckImg[1].classList.add('card');
        arrCheckImg[1].classList.remove('card__clicked');
      }, 500);
    }
  }
  document.body.appendChild(cards);
};

createImgs(noClicked, doubleCards);
overturnsCard();
