import '../vendor/nouislider.min.js';

const priceSlider = document.querySelector('.slider__init-slider');
const inputs = document.querySelectorAll('.slider__input');

const createSlider = () => {
  noUiSlider.create(priceSlider, {
    start: [0, 900],
    range: {
      min: [0],
      max: [1040],
    },
    step: 1,
    connect: true,
    format: {
      to: (value) => parseFloat(value),
      from: (value) => parseFloat(value),
    }
  });
};

// - создаем массив для записи value таргетируемого input
let inputArray;

const setRangeSlider = (i, value) => {
  inputArray = [null, null];

  // - Записываем значение контактного input
  inputArray[i] = value;

  // - передаем значение value измененного input в слайдер
  priceSlider.noUiSlider.set(inputArray);
};

inputs.forEach((element, index) => {
  // - Добавляем обработчик каждому input
  element.addEventListener('change', (evt) => {
    setRangeSlider(index, evt.currentTarget.value);
  });
});

const initSlider = () => {
  // - Создаем слайдер.
  createSlider();

  // - Записываем значение слайдера в Input при изменение значения слайдера.
  priceSlider.noUiSlider.on('update', (values, handle) => {
    // - подставляем в input актуальное значение слайдера.
    inputs[handle].value = Math.round(values[handle]);
  });

  if (priceSlider.dataset.disabled) {
    priceSlider.noUiSlider.disable();
  }
};

const addAria = () => {
  priceSlider.querySelector('.noUi-handle-lower').setAttribute('aria-label', 'Минимальный уровень цены.');
  priceSlider.querySelector('.noUi-handle-upper').setAttribute('aria-label', 'Максимальный уровень цены.');
};

export { initSlider, addAria };
