const MAX_MOBILE_SIZE = 767;
const MAX_TABLET_SIZE = 1439;

const CardSteps = {
  CARD_DESKTOP_STEP: 1400,
  CARD_TABLET_STEP: 768,
  CARD_MOBILE_STEP: 320,
};

const hero = document.querySelector('.hero');
const buttonLeft = document.querySelector('.hero__swipe-button--left');
const buttonRight = document.querySelector('.hero__swipe-button--right');
const productList = document.querySelectorAll('.hero__product-item');
const pagination = document.querySelectorAll('.hero__button-stage');


let CardColors;
let cardStep;
let cardPosition = 0;
let markerPosition = 1;

const definitionBackGroundColor = () => {
  if (window.innerWidth > MAX_MOBILE_SIZE && window.innerWidth <= MAX_TABLET_SIZE) {
    CardColors = [
      'linear-gradient(to bottom, #f3ebe1 77%, #ffffff 77%, #ffffff 100%)',
      'linear-gradient(to bottom, #eae6fC 77%, #ffffff 77%, #ffffff 100%)',
      'linear-gradient(to bottom, #e5e6e8 77%, #ffffff 77%, #ffffff 100%)',
    ];
  } else {
    CardColors = [
      '#f3ebe1',
      '#eae6fC',
      '#e5e6e8',
    ];
  }
};

definitionBackGroundColor();

const checkingWindowSize = () => {
  cardStep = CardSteps.CARD_MOBILE_STEP;
  if (window.innerWidth > MAX_MOBILE_SIZE) {
    cardStep = CardSteps.CARD_TABLET_STEP;
  }
  if (window.innerWidth > MAX_TABLET_SIZE) {
    cardStep = CardSteps.CARD_DESKTOP_STEP;
  }
};

checkingWindowSize();

window.addEventListener('resize', () => {
  checkingWindowSize();

  buttonLeft.setAttribute('disabled', '');
  buttonRight.removeAttribute('disabled', '');

  productList.forEach((listItem) => {
    listItem.style.right = '0';
  });

  cardPosition = 0;

  markerPosition = 1;

  pagination.forEach((button) => {
    button.classList.remove('hero__button-stage--active');
  });

  pagination[0].classList.add('hero__button-stage--active');

  definitionBackGroundColor();

  hero.style.background = `${CardColors[0]}`;
});

buttonLeft.setAttribute('disabled', '');

const moveCardRight = (currentList, step) => {
  buttonLeft.removeAttribute('disabled', '');

  if (step * currentList.length === cardPosition + step * 2) {
    buttonRight.setAttribute('disabled', '');
  }

  if (step * currentList.length <= cardPosition + step) {
    return false;
  }

  cardPosition = cardPosition + step;

  currentList.forEach((listItem) => {
    listItem.style.right = `${cardPosition}px`;
  });
};

const moveCardLeft = (currentList, step) => {
  buttonRight.removeAttribute('disabled', '');

  if (step === cardPosition) {
    buttonLeft.setAttribute('disabled', '');
  }

  if (0 >= cardPosition) {
    return false;
  }

  cardPosition = cardPosition - step;

  currentList.forEach((listItem) => {
    listItem.style.right = `${cardPosition}px`;
  });
};

const moveMarkerRight = () => {
  if (markerPosition >= pagination.length) {
    return false;
  }

  hero.style.background = `${CardColors[markerPosition]}`;

  pagination[markerPosition - 1].classList.remove('hero__button-stage--active');
  pagination[markerPosition].classList.add('hero__button-stage--active');

  markerPosition++;
};

const moveMarkerLeft = () => {
  if (markerPosition <= 1) {
    return false;
  }

  pagination[markerPosition - 1].classList.remove('hero__button-stage--active');
  pagination[markerPosition - 2].classList.add('hero__button-stage--active');

  markerPosition--;

  hero.style.background = `${CardColors[markerPosition - 1]}`;
};

const paginationMove = () => {
  for (let i = 0; i < pagination.length; i++) {
    pagination[i].addEventListener('click', (evt) => {
      productList.forEach((card) => {
        card.style.right = `${cardStep * i}px`;
      });

      hero.style.background = `${CardColors[i]}`;

      pagination.forEach((button) => {
        button.classList.remove('hero__button-stage--active');
      });

      evt.target.classList.add('hero__button-stage--active');
    });
  }
};

const addButtonsSwiper = () => {
  buttonRight.addEventListener('click', () => {
    moveCardRight(productList, cardStep);
    moveMarkerRight();
  });

  buttonLeft.addEventListener('click', () => {
    moveCardLeft(productList, cardStep);
    moveMarkerLeft();
  });
};

export { addButtonsSwiper, paginationMove};

