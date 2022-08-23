import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const inputSearchCountryRef = document.querySelector("#search-box");
const countryListRef = document.querySelector(".country-list")

inputSearchCountryRef.addEventListener("input", debounce(() => {
    let search = inputSearchCountryRef.value.trim();
    if (search.length == 0){
        countryListRef.innerHTML = "";
    }else{
        let response = fetchCountries(search);
        response.then((data) => renderCountrisList(data)); 
    }

}, 300));

function renderCountrisList(data) {
   
    if (data.status == 404) {
        
        Notiflix.Notify.failure("Oops, there is no country with that name")
        return
    }
    //const marcup = data.map((country) => {
    if (data.length == 1) {
        let country = data[0];
        let langs = country.languages.map(language => language.name).join();
        countryListRef.innerHTML = `<li class="country__item">
        <p><b>Name</b>: ${country.name}</p>
        </li>
        <li class="country__item">
        <p><b>Capital</b>: ${country.capital}</p>
        </li>
        <li class="country__item">
        <p><b>Population</b>: ${country.population}</p>
        </li>
        <li class="country__item">
        <p><b>Flag</b>: <img src="${country.flag}" width=20></p>
        </li>
        <li class="country__item">
        <p><b>Languages</b>: ${langs}</p>
        </li>`;
        
    } else if (data.length >= 10) {
        countryListRef.innerHTML = ""
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if(data.length > 1){
         countryListRef.innerHTML = data.map((country) => {
                    return `<li>
        <p><img src="${country.flag}" width=20> ${country.name}</p>
        </li>`
        }).join("");
    }

}

