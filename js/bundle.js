/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculateCallories.js":
/*!**********************************************!*\
  !*** ./src/js/modules/calculateCallories.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calulateCalloies)
/* harmony export */ });
function calulateCalloies() {
	const result = document.querySelector('.calculating__result span');

	let sex, ratio, weight, height, age;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		sex = localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		ratio = localStorage.setItem('ratio', 1.375);
	}

	function renderInterface(selector, activeClass, key) {
		const elements = document.querySelectorAll(`${selector} div`)
		elements.forEach(el => {
			el.classList.remove(activeClass)
			if (el.id === localStorage.getItem('sex')) {
				el.classList.add(activeClass)
			}
			if (el.dataset.ratio === localStorage.getItem('ratio')) {
				el.classList.add(activeClass)
			}
		})
	}

	renderInterface('#gender', 'calculating__choose-item_active')
	renderInterface('.calculating__choose_big', 'calculating__choose-item_active')

	function calculate() {
		if (!sex || !weight || !height || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
		}
	}

	calculate();

	function getStaticData(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`)
		elements.forEach(element => {
			element.addEventListener('click', (el) => {
				if (el.target.getAttribute('data-ratio')) {
					ratio = +el.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +el.target.getAttribute('data-ratio'))
				} else {
					sex = el.target.getAttribute('id');
					localStorage.setItem('sex', el.target.getAttribute('id'))

				}

				elements.forEach(el => {
					el.classList.remove(activeClass)
				})
				el.target.classList.add(activeClass)

				calculate()
			})
		})

	}
	getStaticData('#gender', 'calculating__choose-item_active');
	getStaticData('.calculating__choose_big', 'calculating__choose-item_active');

	function getDinamicData(selector) {
		const input = document.querySelector(selector);


		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '2px solid red'
			} else {
				input.style.border = 'none'
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break
			}
			calculate()
		});
	}
	getDinamicData('#height')
	getDinamicData('#weight')
	getDinamicData('#age')
}


/***/ }),

/***/ "./src/js/modules/getSlider.js":
/*!*************************************!*\
  !*** ./src/js/modules/getSlider.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSlider)
/* harmony export */ });
function getSlider() {

	const slides = document.querySelectorAll('.offer__slide')
	const slidesWrapper = document.querySelector('.offer__slider-wrapper')
	const slidesBox = document.querySelector('.offer__slider-inner')
	const btnSliderNext = document.querySelector('.offer__slider-next')
	const btnSliderPrev = document.querySelector('.offer__slider-prev')
	const currentIndexSlide = document.querySelector('#current')
	const totalNumberSlides = document.querySelector('#total')
	const width = window.getComputedStyle(slidesWrapper).width
	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		totalNumberSlides.textContent = `0${slides.length}`;
		currentIndexSlide.textContent = `0${slideIndex}`;
	} else {
		totalNumberSlides.textContent = slides.length;
		currentIndexSlide.textContent = slideIndex
	}


	slidesBox.style.width = 100 * slides.length + '%';
	slidesBox.style.display = 'flex';
	slidesBox.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => slide.style.width = width);

	slidesWrapper.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dirs = [];

	indicators.classList.add('carusel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;	
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;	
	`;
	slidesWrapper.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dir = document.createElement('li');
		dir.setAttribute('data-slide-to', i + 1);
		dir.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 10px;
		height: 10px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-radius: 100%;
		opacity: .5;
		transition: opacity .6s ease
	`;
		if (i == 0) {
			dir.style.opacity = 1;
		}
		indicators.append(dir);
		dirs.push(dir)
	}


	btnSliderNext.addEventListener('click', () => {
		if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2)
		};

		slidesBox.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			currentIndexSlide.textContent = `0${slideIndex}`;
		} else {
			currentIndexSlide.textContent = slideIndex;
		}
		dirs.forEach(dir => {
			dir.style.opacity = ".5"
		})
		dirs[slideIndex - 1].style.opacity = 1;

	});

	btnSliderPrev.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1)
		} else {
			offset -= +width.slice(0, width.length - 2)
		}
		slidesBox.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			currentIndexSlide.textContent = `0${slideIndex}`;
		} else {
			currentIndexSlide.textContent = slideIndex;
		};
		dirs.forEach(dir => {
			dir.style.opacity = ".5"
		})
		dirs[slideIndex - 1].style.opacity = 1;
	});

	dirs.forEach(dir => {
		dir.addEventListener('click', ev => {
			const slideTo = ev.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesBox.style.transform = `translateX(-${offset}px)`;
			if (slides.length < 10) {
				s.textContent = `0${slideIndex}`;
			} else {
				currentIndexSlide.textContent = slideIndex;
			}
			dirs.forEach(dir => {
				dir.style.opacity = ".5"
			})
			dirs[slideIndex - 1].style.opacity = 1;
		})
	})
}


/***/ }),

/***/ "./src/js/modules/showModalWindow.js":
/*!*******************************************!*\
  !*** ./src/js/modules/showModalWindow.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showModalWindow)
/* harmony export */ });
function showModalWindow() {

	const modalWindow = document.querySelector('.modal');
	const buttonModalOpen = document.querySelectorAll('[data-modal]');
	const buttonModalClose = document.querySelector('[data-close]');

	function openModal() {
		modalWindow.style.display = 'block';
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId); // выключение автоматически запускаемого модального окна
	}
	function closeModal() {
		modalWindow.style.display = 'none';
		document.body.style.overflow = '';
	}
	buttonModalOpen.forEach((ev) => {
		ev.addEventListener('click', openModal);
	});

	buttonModalClose.addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow) {
			closeModal();
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.style.display === 'block') {
			closeModal();
		}
	});
	// const modalTimerId = setTimeout(openModal, 6000) // автоматический запуск модального окна 
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	class formMenu {
		constructor(img, alt, subtitle, description, price, parent, ...classes) {
			this.img = img;
			this.alt = alt;
			this.subtitle = subtitle;
			this.description = description;
			this.classes = classes;
			this.price = price;
			this.parent = document.querySelector(parent);
			this.euroRate = 62;
			this.changeToRub();
		}
		changeToRub() {
			return this.price = this.price * this.euroRate
		}

		renderForm() {
			const menuItem = document.createElement('div');
			if (this.classes.length == 0) {
				this.classes = 'menu__item';
				menuItem.classList.add(this.classes);
			} else {
				this.classes.forEach((className) => menuItem.classList.add(className));
			}
			menuItem.innerHTML = `
			<div class="menu__item">
					<img src=${this.img} alt=${this.alt}>
					<h3 class="menu__item-subtitle"> Меню ${this.subtitle}</h3>
					<div class="menu__item-descr">${this.description}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена</div>
						<div class="menu__item-total"><span>${this.price}</span> руб./день</div>
					</div>
				</div>
					`;
			this.parent.append(menuItem);
		}
	}


	const getResource = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Не можем зафетчить ${url}, status ${res.status}`)
		}
		return await res.json();
	};


	axios.get('http://localhost:3000/menu')
		.then(el => {
			el.data.forEach(({ img, altimg, title, descr, price }) => {
				new formMenu(img, altimg, title, descr, price, '.menu .container').renderForm();
			})
		})
}


/***/ }),

/***/ "./src/js/modules/showTabs.js":
/*!************************************!*\
  !*** ./src/js/modules/showTabs.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showTabs)
/* harmony export */ });
function showTabs(tabsHeader, content, parent) {

	const tabs = document.querySelectorAll(tabsHeader);
	const tabsContent = document.querySelectorAll(content);
	const tabsParent = document.querySelector(parent);

	function hideTabContent() {

		tabsContent.forEach((el) => {
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', event => {
		const { target } = event;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}


/***/ }),

/***/ "./src/js/modules/showTimer.js":
/*!*************************************!*\
  !*** ./src/js/modules/showTimer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showTimer)
/* harmony export */ });
function showTimer() {
	
	const deadline = '2022.12.20';

	function getTimeRemaining(endtime) {
		let daysCount, hoursCount, minutesCount, secondsCount;
		const timeDifference = Date.parse(endtime) - Date.parse(new Date());
		if (timeDifference <= 0) {
			daysCount = 0;
			hoursCount = 0;
			minutesCount = 0;
			secondsCount = 0;
		} else {
			daysCount = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			hoursCount = Math.floor(timeDifference / (1000 * 60 * 60) % 24);
			minutesCount = Math.floor((timeDifference / 1000 / 60) % 60);
			secondsCount = Math.floor((timeDifference / 1000) % 60);
		}

		return {
			timeDifference, daysCount, hoursCount, minutesCount, secondsCount,
		};
	}

	function getNumbersWhithZero(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`;
		}
		return number;
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');

		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const {
				timeDifference, daysCount, hoursCount, minutesCount, secondsCount,
			} = getTimeRemaining(endtime);
			days.innerHTML = getNumbersWhithZero(daysCount);
			hours.innerHTML = getNumbersWhithZero(hoursCount);
			minutes.innerHTML = getNumbersWhithZero(minutesCount);
			seconds.innerHTML = getNumbersWhithZero(secondsCount);

			if (timeDifference <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);
} 


/***/ }),

/***/ "./src/js/modules/userDataManage.js":
/*!******************************************!*\
  !*** ./src/js/modules/userDataManage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ userDataManage)
/* harmony export */ });
function userDataManage(){
	const orderForms = document.querySelectorAll('form');
const message = {
	loading: 'img/form/spinner.svg',
	success: 'Спасибо! Скоро мы с вами свяжемся',
	failure: 'Что-то пошло не так.'
}



const getUserDatafromForm = (form) => {
	form.addEventListener('submit', event => {
		event.preventDefault()

		let statusMessage = document.createElement('img');
		statusMessage.src = message.loading;
		statusMessage.style.cssText = `
				display: block;
				margin: 0 auto
				`;
		form.insertAdjacentElement('afterEnd', statusMessage)
		const formData = new FormData(form)

		const json = JSON.stringify(Object.fromEntries(formData.entries()))

		postData('http://localhost:3000/requests', json)
			.then(data => {
				console.log(data)
				showThanksModal(message.success);
				statusMessage.remove();
			}).catch(() => showThanksModal(message.failure)).finally(() => form.reset())
	})
}

orderForms.forEach(ev => getUserDatafromForm(ev))


const postData = async (url, data) => {
	let res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});
	return await res.json()
}

function showThanksModal(message) {
	const prevModalWindow = document.querySelector('.modal__dialog');
	prevModalWindow.classList.add('hide');
	openModal();
	const thanksModal = document.createElement('div');
	thanksModal.classList.add('modal__dialog');
	thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
	</div>
	`;
	document.querySelector('.modal').append(thanksModal);
	setTimeout(() => {
		thanksModal.remove();
		prevModalWindow.classList.add('show');
		prevModalWindow.classList.remove('hide');
		closeModal();
	}, 4000)
}
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_showTabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/showTabs */ "./src/js/modules/showTabs.js");
/* harmony import */ var _modules_getSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/getSlider */ "./src/js/modules/getSlider.js");
/* harmony import */ var _modules_calculateCallories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculateCallories */ "./src/js/modules/calculateCallories.js");
/* harmony import */ var _modules_showTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/showTimer */ "./src/js/modules/showTimer.js");
/* harmony import */ var _modules_showModalWindow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/showModalWindow */ "./src/js/modules/showModalWindow.js");
/* harmony import */ var _modules_userDataManage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/userDataManage */ "./src/js/modules/userDataManage.js");







(0,_modules_showTabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items')
;(0,_modules_getSlider__WEBPACK_IMPORTED_MODULE_1__["default"])()
;(0,_modules_showTimer__WEBPACK_IMPORTED_MODULE_3__["default"])()
;(0,_modules_showModalWindow__WEBPACK_IMPORTED_MODULE_4__["default"])()
;(0,_modules_userDataManage__WEBPACK_IMPORTED_MODULE_5__["default"])()
;(0,_modules_calculateCallories__WEBPACK_IMPORTED_MODULE_2__["default"])()

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map