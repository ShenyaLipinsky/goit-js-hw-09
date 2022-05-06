import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerOutput: document.querySelector('.timer'),
  dayOutput: document.querySelector('[data-days]'),
  hourOutput: document.querySelector('[data-hours]'),
  minutesOutput: document.querySelector('[data-minutes]'),
  secondsOutput: document.querySelector('[data-seconds]'),
  field: document.querySelectorAll('div .field'),
};

let date = new Date();
let selectedDate = null;
let estimateDays = null;
let timerId = null;
let activeTimer = false;
let time = null;

// refs.dateInput.style.display
refs.timerOutput.style.display = 'flex';

// console.log(refs.field);
refs.field.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.width = 'auto';
  el.style.margin = '20px';
  el.style.fontSize = '25px';
  el.style.fontWeight = '900';
});

Notiflix.Notify.init({
  width: 'auto',
  position: 'top-center',
  distance: '50px',
  borderRadius: '10px',
  clickToClose: true,
  useIcon: false,
  fontSize: '23px',
});

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < date.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (activeTimer) {
      return Notiflix.Notify.failure('Please reboot your page for set new timer');
    }

    selectedDate = selectedDates[0].getTime();
    estimateDays = selectedDate - Date.now();
    if (convertMs(estimateDays).days >= 99) {
      return Notiflix.Notify.failure('Please, set less than 99 days');
    }
  },
};

refs.startBtn.addEventListener('click', function startTimer() {
  let estimateTime = null;
  if (convertMs(estimateDays).days >= 99) {
    return;
  }
  if (activeTimer) {
    console.log('timer is active, STOP PLEASE');
    return;
  }
  activeTimer = true;
  timerId = setInterval(() => {
    estimateTime = selectedDate - Date.now();
    time = convertMs(estimateTime);
    updateTimerOutput(time);
    if (estimateTime < 0) {
      console.log('end of timer');
      console.log(estimateTime);
      refs.secondsOutput.style.color = '';
      clearInterval(timerId);
      activeTimer = false;
      return updateTimerOutput({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
    if (estimateTime < 10000) {
      refs.secondsOutput.style.color = 'red';
    }
    // console.log(convertMs(estimateTime).seconds);
    // console.log(estimateTime);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerOutput({ days, hours, minutes, seconds }) {
  refs.dayOutput.textContent = addLeadingZero(days);
  refs.hourOutput.textContent = addLeadingZero(hours);
  refs.minutesOutput.textContent = addLeadingZero(minutes);
  refs.secondsOutput.textContent = addLeadingZero(seconds);
}
function convertMs(estimateTime) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(estimateTime / day);
  // Remaining hours
  const hours = Math.floor((estimateTime % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((estimateTime % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((estimateTime % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
flatpickr(refs.dateInput, flatpickrOptions);
