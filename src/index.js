import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(elem) {
  elem.preventDefault();
  let searchCountry = searchBox.value;
  if (searchCountry.trim() === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchCountry.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
      }

      if (countries.length >= 2 && countries.length <= 10) {
        const listMarkup = countries.map(country => countryId(country));
        countryList.innerHTML = listMarkup.join('');
        countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const countryCardMarcup = countries.map(country => countryData(country));
        countryList.innerHTML = '';
        countryInfo.innerHTML = countryCardMarcup.join('');
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return error;
    });
}

function countryId({ flags, name }) {
  return `
    <li class = country-item>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=100/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>`;
}

function countryData({ name, capital, population, flags, languages }) {
  return `
    <div class='country-info'>
        <h2 class='country-title'>${name.official}</h2>
        <p class='country-text'>Capital: <span class='country-subtext'>${capital}</span></p>
        <p class='country-text'>Population: <span class='country-subtext'>${population}</span></p>
        <p class='country-text'>Flags: <img class='country-flag' src='${flags.svg}' alt='${
    name.official
  }' width=50/></p> 
        <p class='country-text'>Languages: <span class='country-subtext'>${Object.values(
          languages,
        )}</span></p>
    </div>`;
}
