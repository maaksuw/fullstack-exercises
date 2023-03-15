import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = ({stats}) => {
  const [good, neutral, bad, all, average, positive] = stats
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive} %</p>
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

  const all = good + neutral + bad
  const average = (1*good - 1*bad)/all
  const positive = good/all
  const stats = [good, neutral, bad, all, average, positive]

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
      <Header text="Statistics" />
      <Statistics stats={stats}/>
    </div>
  )
}

export default App