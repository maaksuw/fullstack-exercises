const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return (
    <p>{props.part} {props.count}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.cnt1 + props.cnt2 + props.cnt3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content part={part1} count={exercises1}/>
      <Content part={part2} count={exercises2}/>
      <Content part={part3} count={exercises3}/>
      <Total cnt1={exercises1} cnt2={exercises2} cnt3={exercises3}/>
    </div>
  )
}

export default App