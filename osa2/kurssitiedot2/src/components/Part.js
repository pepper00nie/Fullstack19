import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({ part }) => {
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

export default Part