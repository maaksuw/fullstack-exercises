import { useState, useEffect } from 'react'

import numberService from './services/persons'
import Form from './components/Form'
import Notification from './components/Notification'
import Persons from './components/Persons'
import Filter from './components/Filter'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const notifySuccess = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const isNewPerson = () => {
    return !persons.some( person => person.name === newName )
  }

  const addNewPerson = () => {
    const newPerson = { name: newName, number: newNumber }
    numberService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        notifySuccess(`${response.name} succesfully added to the phonebook.`)
      })
      .catch(error => {
        const message = error.response.data.error
        notifyError(message)
      })
  }

  const updatePerson = () => {
    const id = persons.find( person => person.name === newName ).id
    const updatedPerson = { name: newName, number: newNumber }
    numberService
      .update(id, updatedPerson)
      .then(response => {
        setPersons(persons.filter( person => person.name !== response.name ).concat(response))
        notifySuccess(`New number successfully updated for ${response.name}.`)
      })
      .catch(error => {
        const message = error.response.data.error
        notifyError(message)
        // setPersons(persons.filter( person => person.name !== newName ))
        // notifyError(`Failed to update number for ${newName}. It has already been removed.`)
      })
  }

  const addNewEntry = (event) => {
    event.preventDefault()
    if (isNewPerson()) {
      addNewPerson()
    } else {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number?`)) {
        updatePerson()
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
    functions: [addNewEntry, handleNameChange, handleNumberChange],
    variables: [newName, newNumber]
  }

  const numbersToShow = (filter === '') ? persons : persons.filter( person => person.name.toLowerCase().includes(filter.toLocaleLowerCase()) || person.number.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type='success'/>
      <Notification message={errorMessage} type='error'/>
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