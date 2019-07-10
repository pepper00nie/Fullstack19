import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Weather({ location }) {
  const [ weather, setWeather ] = useState({ condition: {icon: "" } })

  useEffect(() => {
    axios
      .get('http://api.apixu.com/v1/current.json?key=95c645b334294d788fd224940191007&q=' + location)
      .then(result => {
        setWeather(result.data.current)
      })
  }, [])

  return (
    <>
      <h3>Weather in {location}</h3>
      <div>
        <p>Temperature: {weather.temp_c} Celcius</p>
        <img src={"http:" + weather.condition.icon} />
        <p>Wind: {weather.wind_kph} kph in direction {weather.wind_dir}</p>
      </div>
    </>
  )
}

export default Weather