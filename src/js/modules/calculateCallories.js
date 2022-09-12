export default function calulateCalloies() {
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
