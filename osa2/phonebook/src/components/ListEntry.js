import React from 'react'
import ReactDOM from 'react-dom'

const ListEntry = ({ person }) => {
  return (
    <>
      <p>{person.name}, {person.number}</p>
    </>
  )
}

export default ListEntry