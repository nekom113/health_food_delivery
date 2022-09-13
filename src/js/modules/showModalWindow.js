
function openModal(modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.style.display = 'block';
	document.body.style.overflow = 'hidden';
	if (modalTimerId) {
		clearInterval(modalTimerId)
	}
}
function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.style.display = 'none';
	document.body.style.overflow = '';
}


export default function showModalWindow(triggerSelector, modalSelector, modalTimerId) {

	const modalWindow = document.querySelector(modalSelector);
	const buttonModalOpen = document.querySelectorAll(triggerSelector);
	const buttonModalClose = document.querySelector('[data-close]');


	buttonModalOpen.forEach((ev) => {
		ev.addEventListener('click', () => openModal(modalSelector, modalTimerId)
		)
	});

	buttonModalClose.addEventListener('click', () => closeModal('.modal'));

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow) {
			closeModal('.modal');
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.style.display === 'block') {
			closeModal('.modal');
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal('.modal', modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);
}

export { closeModal, openModal }
