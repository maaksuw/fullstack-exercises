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

export default Form