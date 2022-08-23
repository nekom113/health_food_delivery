window.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach((el) => {
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
		});

		tabs.forEach((tab) => {
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

	tabsParent.addEventListener('click', (event) => {
		const { target } = event;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target === item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
	// Timer

	const deadline = `2022.12.31`

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

		return { timeDifference, daysCount, hoursCount, minutesCount, secondsCount }
	}

	function getNumbersWhithZero(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');

		const timeInterval = setInterval(updateClock, 1000)

		updateClock();

		function updateClock() {
			const { timeDifference, daysCount, hoursCount, minutesCount, secondsCount } = getTimeRemaining(endtime)
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

	/* Modal window */

	const modalWindow = document.querySelector('.modal');
	const buttonModalOpen = document.querySelectorAll('[data-modal]')
	const buttonModalClose = document.querySelector('[data-close]')

	function openModal() {
		modalWindow.style.display = 'block';
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId)
	}
	function closeModal() {
		modalWindow.style.display = 'none';
		document.body.style.overflow = '';
	}
	buttonModalOpen.forEach(ev => {
		ev.addEventListener('click', openModal);
	});

	buttonModalClose.addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow) {
			closeModal()
		}
	})
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.style.display === 'block') {
			closeModal()
		}
	})
	// const modalTimerId = setTimeout(openModal, 6000)
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll)
		}

	}
	window.addEventListener('scroll', showModalByScroll)

	// Динамичные карточки с меню
	const menuDB = [{
		img: 'img/tabs/vegy.jpg',
		alt: "vegy",
		subtitle: '"Фитнес"',
		description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и	фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким	качеством!',
		total: 1229,
		parent: ".menu .container"
	},
	{
		img: "img/tabs/elite.jpg",
		alt: "elite",
		subtitle: '“Премиум”',
		description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		total: 1550,
		parent: ".menu .container"
	},
	{
		img: "img/tabs/post.jpg",
		alt: "post",
		subtitle: '"Постное"',
		description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		total: 1430,
		parent: ".menu .container"
	}]

	class formMenu {
		constructor(img, alt, subtitle, description, total, parent) {
			this.img = img;
			this.alt = alt;
			this.subtitle = subtitle;
			this.description = description;
			this.total = total;
			this.parent = document.querySelector(parent)
		}
		renderForm() {
			const menuItem = document.createElement("div");
			menuItem.innerHTML = `
					<div class="menu__item">
						<img src=${this.img} alt=${this.alt}>
						<h3 class="menu__item-subtitle"> Меню ${this.subtitle}</h3>
						<div class="menu__item-descr">${this.description}</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена</div>
							<div class="menu__item-total"><span>${this.total}</span> руб./день</div>
						</div>
					</div>`;

			this.parent.appendChild(menuItem);

		}
	}

	menuDB.forEach(el => {
		new formMenu(
			el.img,
			el.alt,
			el.subtitle,
			el.description,
			el.total,
			el.parent
		).renderForm()
	})


});

