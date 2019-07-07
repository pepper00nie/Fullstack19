import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <>
    <h1>{props.course}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.part.partName} {props.part.exercises}</p>
  </>
)

const Content = (props) => (
  <>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      partName: 'Fundamentals of React',
      exercises: 10
    },
    {
      partName: 'Using props to pass data',
      exercises: 7
    },
    {
      partName: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content
        parts={parts}
      />
      <Total
        parts={parts}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))