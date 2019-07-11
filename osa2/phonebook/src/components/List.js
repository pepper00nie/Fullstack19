import React from 'react'
import ReactDOM from 'react-dom'
import ListEntry from './ListEntry'

const List = ({ persons, personDeleteHandler }) => {
  return (
    <>
      {persons.map(person =>
        <ListEntry key={person.name} person={person} handler={() => personDeleteHandler(person.id)} />
      )}
    </>
  )
}

export default List