const burgerButton = document.querySelector('.main-navigation__user-button');
const navigationList = document.querySelector('.main-navigation__list');

const burgerSwitching = () => {
  burgerButton.addEventListener('click', () => {
    if (burgerButton.classList.contains('main-navigation__user-button--close')) {
      burgerButton.classList.remove('main-navigation__user-button--close');
      navigationList.classList.remove('main-navigation__list--open');
    } else {
      burgerButton.classList.add('main-navigation__user-button--close');
      navigationList.classList.add('main-navigation__list--open');
    }
  });
};

export {burgerSwitching};
