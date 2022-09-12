export default function showModalWindow() {

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
