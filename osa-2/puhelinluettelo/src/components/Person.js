const Person = ({person, remove}) => {
	return (
		<>
			<li>{person.name} {person.number} <button onClick={remove}>Remove</button></li>
		</>
	)
}

export default Person