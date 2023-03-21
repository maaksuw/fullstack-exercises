import { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123 456 789' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

const form = {
  functions: [addName, handleNameChange, handleNumberChange],
  variables: [newName, newNumber]
}

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new number</h3>
      <Form form={form}/>
      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
  )
}

export default App