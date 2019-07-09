import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad
  const average = (good * 1 + bad * -1) / totalFeedback
  const positive = Math.round(100 * (good / totalFeedback))

  if (totalFeedback === 0) {
    return(
      <div>
        <p>No feedback given.</p>
      </div>
    )
  } else {
    return(
      <div>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={totalFeedback} />
            <Statistic text="Average" value={average} />
            <Statistic text="Positive" value={positive + "%"} />
          </tbody>
        </table>
      </div>
    )
  }

}

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setBad(bad + 1)} label="Bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="Neutral" />
      <Button handleClick={() => setGood(good + 1)} label="Good" />

      <h2>Stats</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)