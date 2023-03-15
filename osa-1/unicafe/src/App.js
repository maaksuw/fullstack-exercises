import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = ({text, value, mark}) => {
  if (mark === true) {
    return <p>{text}: {value} %</p>
  }
  return <p>{text}: {value}</p>
}

const Statistics = ({stats}) => {
  const [good, neutral, bad, all, average, positive] = stats
  if (all === 0) {
    return <p>No feedback yet!</p>
  }
  return (
    <div>
      <StatisticsLine text="Good" value={good} mark={false}/>
      <StatisticsLine text="Neutral" value={neutral} mark={false}/>
      <StatisticsLine text="Bad" value={bad} mark={false}/>
      <StatisticsLine text="All" value={all} mark={false}/>
      <StatisticsLine text="Average" value={average} mark={false}/>
      <StatisticsLine text="Positive" value={positive} mark={true}/>
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
  const positive = (good/all)*100
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