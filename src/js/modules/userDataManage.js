import { closeModal, openModal} from "./showModalWindow";

export default function userDataManage(){
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
