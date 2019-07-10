import React from 'react'
import ReactDOM from 'react-dom'
import ListEntry from './ListEntry'

const List = ({ persons }) => {
  return (
    <>
      {persons.map(person =>
        <ListEntry key={person.name} person={person} />
      )}
    </>
  )
}

export default List