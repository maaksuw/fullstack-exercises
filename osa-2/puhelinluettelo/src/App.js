import { useState, useEffect } from 'react'

import numberService from './services/persons'
import './index.css'

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

const Person = ({person, remove}) => {
  return (
    <>
      <li>{person.name} {person.number} <button onClick={remove}>Remove</button></li>
    </>
  )
}

const Persons = ({persons, remove}) => {
  return (
    <ul>
      {persons.map(person => 
        <Person key={person.name} person={person} remove={function(){ remove(person) }}/>
      )}
    </ul>
  )
}

const Filter = ({variable, func}) => <input value={variable} onChange={func} />

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const notifySuccess = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    if (!persons.some( person => person.name === newName )) {
      const newPerson = { name: newName, number: newNumber }
      numberService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          notifySuccess(`${response.name} succesfully added to the phonebook.`)
        })
    } else {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number?`)) {
        const id = persons.find( person => person.name === newName ).id
        const newPerson = { name: newName, number: newNumber }
        numberService
          .update(id, newPerson)
          .then(response => {
            setPersons(persons.filter( person => person.name !== newName ).concat(response))
            notifySuccess(`New number successfully updated for ${response.name}.`)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const remove = (person) => {
    const name = person.name
    const id = person.id
    if (window.confirm(`Remove ${name} from phonebook?`)) {
      numberService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          notifySuccess(`${name} successfully removed from the phonebook.`)
        })
    }
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
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <h3>Add a new number</h3>
      <Form form={form}/>
      <h3>Filter</h3>
      <Filter variable={filter} func={handleFilterChange}/>
      <h3>Numbers</h3>
      <Persons persons={numbersToShow} remove={remove}/>
    </div>
  )
}

export default App