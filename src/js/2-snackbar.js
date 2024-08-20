import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const createPromise = (result, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result === 'fulfilled') {
        resolve({ delay });
      }
      reject({ delay });
    }, delay);
  });
};
const onSubmit = e => {
  e.preventDefault();
  const {
    delay: { value: delay },
    state: { value: state },
  } = e.target;

  createPromise(state, delay)
    .then(({ delay }) =>
      iziToast.success({
        icon: '',
        title: '✅',
        message: ` Fulfilled promise in ${delay} ms`,
        backgroundColor: 'green',
        position: 'topRight',
      })
    )
    .catch(({ delay }) =>
      iziToast.warning({
        icon: '',
        title: '❌',
        message: `Rejected promise in ${delay} ms`,
        backgroundColor: 'red',
        position: 'topRight',
      })
    );
  e.target.reset();
};
form.addEventListener('submit', onSubmit);
