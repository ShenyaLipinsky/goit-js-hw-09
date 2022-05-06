const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
refs.stopBtn.setAttribute('disabled', 'disabled');

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.setAttribute('disabled', 'disabled');
  refs.stopBtn.removeAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = color();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  refs.stopBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.removeAttribute('disabled', 'disabled');
  clearInterval(timerId);
});

let color = function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
