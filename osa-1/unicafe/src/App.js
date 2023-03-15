import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const StatsLine = ({stats}) => {
  const [good, neutral, bad] = stats
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)

  const increaseNeutral = () => setNeutral(neutral + 1)

  const increaseBad = () => setBad(bad + 1)

  const stats = [good, neutral, bad]

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
      <Header text="Statistics" />
      <StatsLine stats={stats}/>
    </div>
  )
}

export default App