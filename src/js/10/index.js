import '/src/css/10/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.getElementById('search-box'),
  containerEl: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  clearMarkup();
  const textInput = e.target.value.trim();
  if (textInput != '') {
    fetchCountries(textInput)
      .then(renderHTML)
      .catch(err => Notify.failure('Oops, there is no country with that name'));
  }
}

function renderHTML(value) {
  if (value.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (value.length >= 2 && value.length <= 10) {
    renderCountriesList(value);
  } else if (value.length === 1) {
    renderCountryCard(value);
  }
}

function clearMarkup() {
  refs.inputEl.innerHTML = '';
  refs.containerEl.innerHTML = '';
}

function renderCountriesList(data) {
  const markup = data
    .map(
      ({ flags, name }) =>
        `<li class="country-item">
				<img src="${flags.svg}" width="50px">
				<p class="country-text">${name.common}</p>
				</li>`
    )
    .join('');
  refs.containerEl.insertAdjacentHTML('beforeend', markup);
}

function renderCountryCard(data) {
  const markup = data
    .map(
      ({ flags, name, capital, population, languages }) =>
        `<li>
				<img src="${flags.svg}" width="200px">
				<p class="country-text">${name.common}</p>
				<p class="country-text">Capital: ${capital}</p>
				<p class="country-text">Population: ${population}</p>
				<p class="country-text">Languages: ${Object.values(languages).join(', ')}.</p>
				</li>`
    )
    .join('');
  refs.containerEl.insertAdjacentHTML('beforeend', markup);
}
