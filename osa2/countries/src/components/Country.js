import React from 'react';
import Weather from './Weather'

function Country({ country }) {
  return (
    <div>
      <div>
        <h2>{country.name}</h2>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
      </div>
      <div>
        <img src={country.flag} style={{maxWidth: '200px'}} alt="" />
      </div>
      <div>
        <Weather location={country.capital} />
      </div>
    </div>
  )
}

export default Country;