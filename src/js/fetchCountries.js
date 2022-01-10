export function fetchCountries(name) {
  const pathUrl = 'https://restcountries.com/v3.1/name/';
  const inform = '?fields=name,capital,population,flags,languages';
  return fetch(`${pathUrl}${name}${inform}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
