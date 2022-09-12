export default function showTimer() {
	
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
