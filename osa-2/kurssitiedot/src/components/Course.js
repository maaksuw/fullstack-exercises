const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
}

const Total = ({ sum }) => <p><b>Exercises in total {sum}</b></p>

const Course = ({course}) => {
  const parts = course.parts
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((cumul, x) => cumul + x, 0)
    return (
      <>
        <Header name={course.name} />
        <Content parts={parts} />
        <Total sum={sum} />
      </>
    )
}

export default Course