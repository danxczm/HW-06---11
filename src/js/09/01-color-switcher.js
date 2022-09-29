const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;
let isActive = false;

const COLOR_CHANGE_TIME = 1000;

refs.startBtn.addEventListener('click', startChangingColor);
refs.stopBtn.addEventListener('click', stopChangingColor);

function startChangingColor() {
  if (isActive) {
    return;
  }

  isActive = true;

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_CHANGE_TIME);
}

function stopChangingColor() {
  isActive = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
