import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <>
    <h1>{props.course.name}</h1>
  </>
)

const Part = (props) => (
  <>
    <p>{props.part.partName} {props.part.exercises}</p>
  </>
)

const Content = (props) => (
  <>
    <Part part={props.course.parts[0]} />
    <Part part={props.course.parts[1]} />
    <Part part={props.course.parts[2]} />
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />
      <Content
        course={course}
      />
      <Total
        course={course}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))