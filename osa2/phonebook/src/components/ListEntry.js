import React from 'react'
import ReactDOM from 'react-dom'

const ListEntry = ({ person }) => {
  return (
    <>
      <p>{person.name}</p>
    </>
  )
}

export default ListEntry