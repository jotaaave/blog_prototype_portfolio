import './css/style.css';
import './css/normalize.css';

const button = document.querySelector('.sendLogin') as HTMLButtonElement;
const form = document.querySelector('.signForm') as HTMLFormElement;
form.addEventListener('submit', (e) => {
  button.classList.add('disabled');
});

history.pushState(null, '', document.URL);
window.addEventListener('popstate', (e) => {
  history.pushState(null, '', document.URL);
});
