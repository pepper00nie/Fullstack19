import React, { useState } from 'react'
import Search from './components/Search'
import NewPersonForm from './components/NewPersonForm'
import List from './components/List'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newPerson, setNewPerson ] = useState(
    { name: '', number: '' }
  )
  const [ search, setSearch ] = useState('')

  const nameChangeHandler = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }
  const numberChangeHandler = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }
  const searchChangeHandler = (event) => {
    setSearch(event.target.value)
  }

  const searchRes = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const isUnique = !persons.some(person => person.name === newPerson.name)

    if (isUnique) {
      setPersons(persons.concat(newPerson))
    } else {
      window.alert(
      `${newPerson.name} already exists in the phonebook.`
      )
    }

    setNewPerson({ name: '', number: '' })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handler={searchChangeHandler} />
      <h3>Add new contact</h3>
      <NewPersonForm
        name={newPerson.name}
        number={newPerson.number}
        nameHandler={nameChangeHandler}
        numberHandler={numberChangeHandler}
        addHandler={addPerson}
      />
      <h2>Numbers</h2>
      <List persons={searchRes} />
    </div>
  )

}

export default App