import Notiflix from 'notiflix';
const form = document.querySelector(".form")
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Notify.failure('Qui timide rogat docet negare')
    form.reset()
    return
  }
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  for (let i = 0; i < amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`)
          
      });
  }
});
