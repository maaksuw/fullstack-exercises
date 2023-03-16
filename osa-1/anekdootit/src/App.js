import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const DisplayAnecdote = ({anecdote, votes}) => (
  <div>
    <p>{anecdote}</p>
    <p>Votes: {votes}</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const getRandomAnecdote = () => anecdotes[getRandomInt(anecdotes.length)]
  const getAnecdoteId = (target) => anecdotes.findIndex(x => x === target)

  const [selected, setSelected] = useState(getRandomAnecdote())
  const [votes, setVotes] = useState(new Uint8Array(8))
  const [best, setBest] = useState(getRandomAnecdote)

  const selectAnecdote = () => (
    setSelected(getRandomAnecdote())
  )

  const addVote = () => {
    const id = getAnecdoteId(selected)
    const updatedVotes = [ ...votes]
    updatedVotes[id] += 1
    setVotes(updatedVotes)

    const maxVotes = Math.max(...updatedVotes)
    const bestId = updatedVotes.findIndex(x => x === maxVotes)
    setBest(anecdotes[bestId])
  }

  return (
    <div>
      <Header text="Random anecdote" />
      <DisplayAnecdote anecdote={selected} votes={votes[getAnecdoteId(selected)]}/>
      <Button handleClick={selectAnecdote} text="Show a new anecdote" />
      <Button handleClick={addVote} text="Vote" />
      <Header text="Most popular anecdote" />
      <DisplayAnecdote anecdote={best} votes={votes[getAnecdoteId(best)]}/>
    </div>
  )
}

export default App