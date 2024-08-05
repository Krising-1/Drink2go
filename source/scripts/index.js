/* в этот файл добавляет скрипты*/
import { burgerSwitching } from './burger.js';
import {addButtonsSwiper, paginationMove} from './hero-swiper.js';
import { initSlider, addAria } from './price-slider.js';

burgerSwitching();
addButtonsSwiper();
paginationMove();
initSlider();
addAria();

