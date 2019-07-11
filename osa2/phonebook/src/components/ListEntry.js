import React from 'react'
import ReactDOM from 'react-dom'

const ListEntry = ({ person, handler }) => {
  return (
    <>
      <p>{person.name}, {person.number} <button onClick={handler} >Delete</button></p>
    </>
  )
}

export default ListEntry