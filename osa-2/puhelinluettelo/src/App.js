import { useState, useEffect } from 'react'
import axios from 'axios'

const Form = ({form}) => {
  const [addName, handleNameChange, handleNumberChange] = form.functions
  const [newName, newNumber] = form.variables
  return (
    <form onSubmit={addName}>
      <div> Name: <input value={newName} onChange={handleNameChange}/> </div>
      <div> Number: <input value={newNumber} onChange={handleNumberChange}/> </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({name, number}) => <li>{name} {number}</li>

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map(person => 
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </ul>
  )
}

const Filter = ({variable, func}) => <input value={variable} onChange={func} />

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (!persons.some( person => person.name === newName)) {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} is already in the phonebook.`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const form = {
    functions: [addName, handleNameChange, handleNumberChange],
    variables: [newName, newNumber]
  }

  const numbersToShow = (filter === '') ? persons : persons.filter( person => person.name.toLowerCase().includes(filter) || person.number.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new number</h3>
      <Form form={form}/>
      <h3>Filter</h3>
      <Filter variable={filter} func={handleFilterChange}/>
      <h3>Numbers</h3>
      <Persons persons={numbersToShow}/>
    </div>
  )
}

export default App