import React from 'react';
import ListItem from './ListItem'
import Country from './Country'

function Results({ results, countryButtonHandler }) {
  if (results.length === 1) {
    return (
      <>
        { results.map(country => <Country key={country} country={country} />) }
      </>
    )
  } else if (results.length <= 10) {
    return (
      <>
        { results.map(country => <ListItem key={country.name} country={country} handler={countryButtonHandler} />) }
      </>
    )
  } else {
    return (
      <p>Too many matches. Please type more specific argument.</p>
    )
  }
}

export default Results;