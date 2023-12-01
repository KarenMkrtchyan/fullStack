import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ handleFilter, filter }) => {
	return (
		<div>
			filter shown with{" "}
			<input
				onChange={(event) => handleFilter(event)}
				value={filter}
				type="text"
			/>
		</div>
	);
};

const PersonForm = ({
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	addPerson,
}) => {
	return (
		<form>
			<h2>Add a new</h2>
			<div>
				name:{" "}
				<input
					value={newName}
					onChange={(event) => {
						setNewName(event.target.value);
					}}
				/>
			</div>
			<div>
				number:{" "}
				<input
					value={newNumber}
					onChange={(event) => {
						setNewNumber(event.target.value);
					}}
				/>
			</div>
			<div>
				<button onClick={(event) => addPerson(event)} type="submit">
					add
				</button>
			</div>
		</form>
	);
};

const PeopleNumber = ({ filteredName }) => {
	return (
		<>
			{filteredName.map((person) => {
				console.log(person);
				return (
					<div key={person.name}>
						{person.name} {person.number}
					</div>
				);
			})}
		</>
	);
};

const App = () => {
	const [persons, setPersons] = useState([{}]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [filteredName, setFilteredNames] = useState(persons);

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			//console.log(response.data);
			setPersons(response.data);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();

		const repeat = persons.filter((person) => {
			return person.name === newName;
		});
		console.log(repeat);
		if (repeat.length > 0) {
			alert(`${newName} is already added to phonebook`);
			return false;
		}
		setPersons(persons.concat({ name: newName, number: newNumber }));
		setFilter("");
		setNewName("");
		setNewNumber("");
		setFilteredNames(persons.concat({ name: newName, number: newNumber }));
	};

	const handleFilter = (event) => {
		let newFilter = event.target.value;
		newFilter = newFilter.toLowerCase();
		setFilter(newFilter);
		const filtered = persons.filter((person) => {
			return person.name.toLowerCase().includes(newFilter);
		});
		console.log(filtered);
		setFilteredNames(filtered);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleFilter={handleFilter} filter={filter} />
			<PersonForm
				newName={newName}
				setNewName={setNewName}
				newNumber={newNumber}
				setNewNumber={setNewNumber}
				addPerson={addPerson}
			/>
			<h2>Numbers</h2>
			<PeopleNumber filteredName={filteredName} />
		</div>
	);
};

export default App;
