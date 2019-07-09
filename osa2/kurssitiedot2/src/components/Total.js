import React from 'react'
import ReactDOM from 'react-dom'

const Total = ({ course }) => <><p>Total of {course.parts.map(part => part.exercises).reduce( (a, b) => a += b )} excercises.</p></>

export default Total