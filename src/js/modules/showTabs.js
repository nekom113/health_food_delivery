export default function showTabs(tabsHeader, content, parent, activeClass) {

	const tabs = document.querySelectorAll(tabsHeader);
	const tabsContent = document.querySelectorAll(content);
	const tabsParent = document.querySelector(parent);

	function hideTabContent() {

		tabsContent.forEach((el) => {
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
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
