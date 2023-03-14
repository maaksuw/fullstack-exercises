const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.count}</p>
  )
}

const Content = (props) => {
  const [first, second, third] = props.parts
  return (
    <div>
      <Part name={first.name} count={first.exercises}/>
      <Part name={second.name} count={second.exercises}/>
      <Part name={third.name} count={third.exercises}/>
    </div>
  )
}

const Total = (props) => {
  const [first, second, third] = props.parts
  return (
    <p>Number of exercises {first.exercises + second.exercises + third.exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App