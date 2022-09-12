export default function getSlider() {

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
