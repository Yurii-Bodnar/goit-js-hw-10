const URL = "https://restcountries.com"
export function fetchCountries(name) {
    
    return fetch(`${URL}/v2/name/${name}?fields=name,capital,population,flag,languages`)
        .then((response) => response.json().catch(error => error)
        );   
    
}



