import { closeModal, openModal } from "./showModalWindow";
import { postData } from "./serveces/services";

export default function userDataManage(formSelector, modalTimerId) {
	const orderForms = document.querySelectorAll(formSelector);
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
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => showThanksModal(message.failure)).finally(() => form.reset())
		})
	}

	orderForms.forEach(ev => getUserDatafromForm(ev))




	function showThanksModal(message) {
		const prevModalWindow = document.querySelector('.modal__dialog');
		prevModalWindow.classList.add('hide');
		openModal('.modal', modalTimerId);
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
