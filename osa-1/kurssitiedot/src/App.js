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
  return (
    <div>
      <Part name={props.part1.name} count={props.part1.exercises}/>
      <Part name={props.part2.name} count={props.part2.exercises}/>
      <Part name={props.part3.name} count={props.part3.exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.cnt1 + props.cnt2 + props.cnt3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total cnt1={part1.exercises} cnt2={part2.exercises} cnt3={part3.exercises}/>
    </div>
  )
}

export default App