import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { convertMs, addLeadingZero } from './helpers/helpers';

const refs = {
  button: document.querySelector('button'),
  selector: document.querySelector('#datetime-picker'),
  timerValues: document.querySelectorAll('.value'),
};

refs.button.disabled = true;
let intervalId = null;
let inputDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputDate = selectedDates[0].getTime();

    if (inputDate <= Date.now()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        position: 'topRight',
      });
    } else {
      refs.button.disabled = false;
    }
  },
};
const onBtnClick = e => {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    let dateDiference = inputDate - currentTime;
    let dates = convertMs(dateDiference);
    for (let i = 0; i < refs.timerValues.length; i++) {
      refs.timerValues[i].textContent = addLeadingZero(
        Object.entries(dates)[i][1]
      );
    }
    if (dateDiference < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
  refs.button.disabled = true;
  refs.selector.disabled = true;
};
flatpickr(refs.selector, options);
refs.button.addEventListener('click', onBtnClick);
