import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  bell: document.querySelector('audio'),
};

refs.startBtn.disabled = true;

let startTime;
let isActive = false;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0].getTime();
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please select date in future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.inputEl, options);

function onStartClick() {
  if (isActive) {
    return;
  }
  intervalId = setInterval(() => {
    const time = convertMs(startTime - Date.now());
    updateClockFace(time);
    stopWhenEnds(time);
  }, 1000);
  isActive = true;
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.daysEl.innerHTML = days;
  refs.hoursEl.innerHTML = hours;
  refs.minutesEl.innerHTML = minutes;
  refs.secondsEl.innerHTML = seconds;
}

function stopWhenEnds(time) {
  if (
    time.days == 0 &&
    time.hours == 0 &&
    time.minutes == 0 &&
    time.seconds == 0
  ) {
    playFinishSound();
    Notiflix.Notify.success('The time is over');
    clearInterval(intervalId);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function playFinishSound() {
  refs.bell.play();
}
