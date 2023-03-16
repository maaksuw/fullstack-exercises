import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsTableLine = ({text, value}) => {
  if (text === "Positive") {
    return (
      <tr>
        <td>{text}:</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const StatisticsTable = ({stats}) => {
  const [good, neutral, bad, all, average, positive] = stats
  if (all === 0) {
    return <p>No feedback yet!</p>
  }
  return (
    <table>
      <tbody>
        <StatisticsTableLine text="Good" value={good} />
        <StatisticsTableLine text="Neutral" value={neutral} />
        <StatisticsTableLine text="Bad" value={bad} />
        <StatisticsTableLine text="All" value={all} />
        <StatisticsTableLine text="Average" value={average} />
        <StatisticsTableLine text="Positive" value={positive} />
      </tbody>
    </table>
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
  const average = ((1*good - 1*bad)/all).toFixed(1)
  const positive = ((good/all)*100).toFixed(1)
  const stats = [good, neutral, bad, all, average, positive]

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
      <Header text="Statistics" />
      <StatisticsTable stats={stats} />
    </div>
  )
}

export default App