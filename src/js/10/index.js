import '/src/css/10/styles.css';

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v3.1/name/ukraine')
  .then(res => res.json())
  .then(r => console.log(r));
