import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content course={course} />
    </>
  )
}

export default Course