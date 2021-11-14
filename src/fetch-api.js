import { Notify } from 'notiflix/build/notiflix-notify-aio';
function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {

                if (response.status === 404) {
                    Notify.failure("Oops, there is no country with that name");
                }
                
                throw new Error(response.statusText);
            }
            return response.json();
        });
}

export default { fetchCountries }