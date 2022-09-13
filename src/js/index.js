import showTabs from './modules/showTabs';
import getSlider from './modules/getSlider';
import calulateCalloies from './modules/calculateCallories';
import showTimer from './modules/showTimer';
import showModalWindow from './modules/showModalWindow';
import userDataManage from './modules/userDataManage';
import { openModal } from '../js/modules/showModalWindow'

let modalTimerId = setTimeout(openModal, 6000) // автоматический запуск модального окна 
showTabs('.tabheader__item', '.tabcontent', '.tabheader__items')
getSlider()
showTimer()
showModalWindow('[data-modal]', '.modal', modalTimerId)
userDataManage()
calulateCalloies()
