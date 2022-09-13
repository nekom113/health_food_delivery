import showTabs from './modules/showTabs';
import getSlider from './modules/getSlider';
import calulateCalloies from './modules/calculateCallories';
import showTimer from './modules/showTimer';
import showModalWindow from './modules/showModalWindow';
import userDataManage from './modules/userDataManage';
import { openModal } from '../js/modules/showModalWindow';
import cards from './modules/cards';

let modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000) // автоматический запуск модального окна 
showTabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
showTimer('.timer', '2022.12.20');
showModalWindow('[data-modal]', '.modal', modalTimerId);
userDataManage('form', modalTimerId);
cards();
calulateCalloies();
getSlider({
	container: '.offer__slider',
	wrapper: '.offer__slider-wrapper',
	slide: '.offer__slide',
	nextSlide: '.offer__slider-next',
	prevSlide: '.offer__slider-prev',
	totalumbersSlides: '#total',
	currentSlide: '#current',
	field: '.offer__slider-inner'
})

getSlider();
