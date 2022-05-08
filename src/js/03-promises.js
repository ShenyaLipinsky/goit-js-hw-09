import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name = delay]'),
  step: document.querySelector('[name = step]'),
  amount: document.querySelector('[name = amount]'),
  btn: document.querySelector('button'),
};
// console.log(refs.delay);
let delay = null;
let step = null;
let position = null;

Notiflix.Notify.init({
  width: '400px',
  position: 'top-right',
  distance: '50px',
  borderRadius: '10px',
  clickToClose: true,
  useIcon: false,
  fontSize: '23px',
});

refs.btn.addEventListener('click', e => {
  // console.log(refs.delay.value);
  // console.log(amountLoops);
  // e.preventDefault();
  position = refs.amount.value;
  delay = refs.delay.value;
  step = refs.step.value;

  // console.log(delay);
  // console.log(step);
  // console.log(event);
  for (let index = 1; index <= position; index += 1) {
    if (index != 1) {
      delay = Number(delay) + Number(step);
    }

    createPromise(index, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      // console.log(shouldResolve);
      if (shouldResolve) {
        // Fulfill
        return resolve({ position, delay });
      }
      // Reject
      return reject({ position, delay });
    }, delay);
  });
}
