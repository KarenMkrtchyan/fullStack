import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setNewFilter] = useState("");

	const addPerson = (event) => {
		event.preventDefault();
		const dupplicate = persons.find((person) => person.name === newName);
		console.log(dupplicate);
		if (dupplicate) {
			alert(`${newName} is already added to the phonebook`);
		} else {
			setPersons(persons.concat({ name: newName, number: newNumber }));
		}
		setNewName("");
		setNewNumber("");
	};

	const handleChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterChange = (event) => {
		setNewFilter(event.target.value.toLowerCase());
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with
				<input value={filter} onChange={handleFilterChange} />
			</div>
			<form onSubmit={addPerson}>
				<h2>Add a new</h2>
				<div>
					name: <input onChange={handleChange} value={newName} />
				</div>
				<div>
					number:
					<input onChange={handleNumberChange} value={newNumber}></input>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons
					.filter((person) => person.name.toLowerCase().includes(filter))
					.map((person) => (
						<li key={person.name}>
							{person.name} {person.number}
						</li>
					))}
			</ul>
		</div>
	);
};

export default App;
