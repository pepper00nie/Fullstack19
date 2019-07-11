import React, { useState, useEffect } from 'react'
import contactService from './services/contact'
import Search from './components/Search'
import NewPersonForm from './components/NewPersonForm'
import List from './components/List'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newPerson, setNewPerson ] = useState(
    { name: '', number: '' }
  )
  const [ search, setSearch ] = useState('')
  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState(null)
 
  useEffect(() => {
    contactService
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
      .catch(error => {
        errorSetter("Error: couldn't load contacts from server")
      })
  },[])

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
    const isUnique = !persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (isUnique) {
      contactService
        .create(newPerson)
        .then(result => {
          setPersons(persons.concat(result))
          successSetter(`Successfully added ${newPerson.name}`)
        })
        .catch(error => {
          errorSetter("Error: couldn't create new contact")
        })
    } else if (window.confirm(`Overriding ${newPerson.name}'s number with ${newPerson.number}. Are you sure?`)) {

      const id = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase()).id

      contactService      
        .update(id, newPerson)
        .then(result => {
          setPersons(persons.map(p => p.id !== id ? p : result))
          successSetter(`Successfully updated ${newPerson.name}'s number`)
        })
        .catch(error => {
          errorSetter("Error: Couldn't update contact")
        })
    }

    setNewPerson({ name: '', number: '' })
  }

  const personDeleteHandler = id => {
    contactService
      .remove(id)
      .then(result => {
        setPersons(persons.filter(p => p.id !== id))
        successSetter(`Successfully deleted contact`)
      })
      .catch(error => {
        errorSetter("Error: couldn't delete contact")
      })
  }

  const errorSetter = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const successSetter = (message) => {
    setSuccess(message)
    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  return (
    <>
      <Notification message={error} cssClass="error" />
      <Notification message={success} cssClass="success" />
      <div id="master">
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
        <h3>Numbers</h3>
        <List persons={searchRes} personDeleteHandler={personDeleteHandler} />
      </div>
    </>
  )

}

export default App