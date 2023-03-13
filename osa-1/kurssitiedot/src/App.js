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
      <Part name={props.part1[0]} count={props.part1[1]}/>
      <Part name={props.part2[0]} count={props.part2[1]}/>
      <Part name={props.part3[0]} count={props.part3[1]}/>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content part1={[part1, exercises1]} part2={[part2, exercises2]} part3={[part3, exercises3]} />
      <Total cnt1={exercises1} cnt2={exercises2} cnt3={exercises3}/>
    </div>
  )
}

export default App