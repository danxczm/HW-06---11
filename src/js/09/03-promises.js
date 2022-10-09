import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', getValuesOfForm);

function getValuesOfForm(event) {
  event.preventDefault();

  const formElement = event.currentTarget.elements;

  let delay = ~~formElement.delay.value;
  let step = ~~formElement.step.value;
  let amount = ~~formElement.amount.value;

  promiseDefine(delay, step, amount);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay }); //те що ми передали (результат) буде записано в "result" (then)
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

function promiseDefine(delay, step, amount) {
  Loading.standard('зараз як щось почнеться');
  Loading.remove(delay);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay).then(onSuccess).catch(onFailure);
    delay += step;
  }
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
