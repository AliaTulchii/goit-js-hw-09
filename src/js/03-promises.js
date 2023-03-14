import Notiflix from 'notiflix';


const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  createBtn: document.querySelector('button')
};

refs.createBtn.addEventListener('click', onPromiseCreate);



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
   
  });  
}


function onPromiseCreate(evt) {
  evt.preventDefault();

  let delayValue = Number(refs.delay.value);
  let delayStep = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  for (let i = 1; i <= amount; i += 1) {
   
    let promiseDelay = delayValue + delayStep * i;

    createPromise(i, promiseDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });    
  }
}



