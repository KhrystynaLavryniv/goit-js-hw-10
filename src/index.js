import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetch-api';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY))
function onInput (){
    resetCountries();

    const name = input.value.trim();
    
    if (!name) {
        resetCountries();
        return;
    }

    API.fetchCountries(name)
        .then(userInputOption)
          .catch(error => { console.log(error) })
}

function userInputOption(countries) {
    resetCountries()

    if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
    }

    if (countries.length >= 2 && countries.length < 10) {
        countries.map((country) => {
            countriesMarkup(country)
        }).join()
    }
    if (countries.length === 1) {
        countries.map((country) => {
            countryMarkup(country)
        }).join()
    }
}

function countriesMarkup({name,flags}) {
    countryList.insertAdjacentHTML('beforeend',
        `<li class ="list">
            <img src="${flags.svg}">
            <h2>Country:<span class="info">${name.official}</span></h2>
        </li>`)
}

function countryMarkup({name,capital,population,languages,flags}) {
    const languagesValue = Object.values(languages);
    countryInfo.insertAdjacentHTML('beforeend',
        `<ul>
            <li class ="list">
                <img src="${flags.svg}">
            </li>
            <li class ="list">
                <h2>Country: <span class="info">${name.official}</span></h2>
            </li>
            <li class ="list">
                <h2>Capital: <span class="info">${capital}</span></h2>
            </li>
            <li class ="list">
                <h2>Population: <span class="info">${population}</span></h2>
            </li>
            <li class ="list">
               <h2>Languages: <span class="info">${languagesValue}</span></h2>
            </li>
         </ul>`)

}
function resetCountries() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}

