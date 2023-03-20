const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
  
const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
    )
}
  

const Course = ({course}) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </>
    )
}

export default Course