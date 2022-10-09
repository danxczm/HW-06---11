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
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay).then(onSucces).catch(onFailure);
    delay += step;
  }
}

function onSucces({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
