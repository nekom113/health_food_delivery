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
  const deadline = '2022-08-19'


  function getTimeRemaining(endtime){
    const timeDifference = Date.parse(endtime) - Date.parse(new Date());
    const daysCount = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursCount = Math.floor(timeDifference / (1000 * 60 * 60) % 24);
    const minutesCount = Math.floor((timeDifference / 1000 / 60) % 60);
    const secondsCount = Math.floor((timeDifference / 1000) % 60);

    return {timeDifference, daysCount, hoursCount, minutesCount, secondsCount}
  }

  function getNumbersWhithZero(number){
    if(number >=0 && number < 10){
      return `0${number}`
    } else{
      return number
    }
  }

  function setClock(selector, endtime){
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');

    const timeInterval = setInterval(updateClock, 1000)

    updateClock();

    function updateClock(){
      const {timeDifference, daysCount, hoursCount, minutesCount, secondsCount} = getTimeRemaining(endtime)
      days.innerHTML = getNumbersWhithZero(daysCount);
      hours.innerHTML = getNumbersWhithZero(hoursCount);
      minutes.innerHTML = getNumbersWhithZero(minutesCount);
      seconds.innerHTML = getNumbersWhithZero(secondsCount);

      if(timeDifference <= 0){
        clearInterval(timeInterval);
      } 
    }
  }

  setClock('.timer', deadline)
});