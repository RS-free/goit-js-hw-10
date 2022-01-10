export function countryId({ flags, name }) {
  return `
    <li class = country-item>
    <img class = 'country-list__flags' src="${flags.svg}" alt="${name.official}" width=100/>
    <h2 class = country-list__name>${name.official}</h2>
    </li>`;
}

export function countryData({ name, capital, population, flags, languages }) {
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
