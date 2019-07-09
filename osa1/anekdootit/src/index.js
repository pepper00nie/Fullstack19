import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const select = () => () => setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))

  const vote = () => () => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    setVotes(newVotes)
  }

  return (
  <div>
    <div>
      <h1>Anecdote of the Day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        This anecdote has {votes[selected]} votes.
      </p>
      <button onClick={vote()}>Vote</button>
      <button onClick={select()}>Next</button>
     </div>
     <div>
      <h1>Most voted anecdote</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
     </div>
   </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)