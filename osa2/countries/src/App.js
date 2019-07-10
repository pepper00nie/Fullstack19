import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchField from './components/SearchField'
import Results from './components/Results'

function App() {
  const [ search, setSearch ] = useState("")
  const [ results, setResults ] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(result => {
        setResults(result.data)
      })
  },[])

  const searchHandler = (event) => {
    setSearch(event.target.value)
  }

  const countryButtonHandler = (event) => {
    event.preventDefault()
    setSearch(event.target.id)
  }

  const searchRes = results.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <SearchField value={search} handler={searchHandler} />
      <Results results={searchRes} countryButtonHandler={countryButtonHandler} />
    </div>
  );
}

export default App;
