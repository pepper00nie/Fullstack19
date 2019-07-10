import React, { useState } from 'react'
import ListEntry from './components/ListEntry'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const nameChangeHandler = (event) => setNewName(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const newNameObj = { name: newName }
    
    setPersons(persons.concat(newNameObj))
    setNewName("")
  }

  const list = persons.map(person => <ListEntry key={person.name} person={person} />)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {list}
    </div>
  )

}

export default App