import Person from './Person'

const Persons = ({persons, remove}) => {
	return (
		<ul>
			{persons.map(person => 
				<Person key={person.name} person={person} remove={function(){ remove(person) }}/>
			)}
		</ul>
	)
}

export default Persons