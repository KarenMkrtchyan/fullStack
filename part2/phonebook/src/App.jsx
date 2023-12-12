import { useState, useEffect } from "react";
import server from "./services/addPerson";

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

const PeopleNumberList = ({ filteredName, deletePerson }) => {
	//console.log(filteredName);
	return (
		<ul>
			{filteredName.map((person) => (
				<PersonNumber
					key={person.name}
					person={person}
					deletePerson={deletePerson}
				/>
			))}
		</ul>
	);
};

const PersonNumber = ({ person, deletePerson }) => {
	return (
		<li>
			{person.name} {person.number}
			<button onClick={() => deletePerson(person)}>Delete</button>
		</li>
	);
};

const App = () => {
	const [persons, setPersons] = useState([{}]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [filteredName, setFilteredNames] = useState(persons);

	useEffect(() => {
		server.fetchAll().then((response) => {
			setPersons(response);
			setFilteredNames(response);
		});
	}, []);

	const deletePerson = (person) => {
		server.deletePerson(person).then(() => {
			setPersons(persons.filter((p) => p.id !== person.id));
			setFilteredNames(persons.filter((p) => p.id !== person.id));
		});
	};

	// const updatePerson = (person) => {
	// 	server.updatePerson(person, newName).then(() => {
	// 		//setPersons(persons.filter((p) => p.id !== person.id));
	// 		//setFilteredNames(persons.filter((p) => p.id !== person.id));
	// 	});
	// };

	const addPerson = (event) => {
		event.preventDefault();
		const repeat = persons.filter((person) => {
			return person.name === newName;
		});
		if (repeat.length > 0) {
			if (
				confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				const personBeingChanged = persons.find(
					(person) => person.name === newName
				);
				console.log(`updating ${personBeingChanged.name}`);
				server.updatePerson(personBeingChanged, newNumber).then((response) => {
					console.log(response);
					const newList = persons.map((person) => {
						return person.name === newName ? response : person;
					});
					console.log(newList);
					setPersons(newList);
					setFilteredNames(newList);
				});
			}
			return 0;
		}

		//setFilteredNames(persons.concat({ name: newName, number: newNumber }));
		server
			.addPerson({
				name: newName,
				number: newNumber,
			})
			.then((returnedPersons) => {
				console.log(returnedPersons);
				setPersons(persons.concat(returnedPersons));
				setFilteredNames(persons.concat(returnedPersons));
				setFilter("");
				setNewName("");
				setNewNumber("");
			});
	};

	const handleFilter = (event) => {
		let newFilter = event.target.value;
		newFilter = newFilter.toLowerCase();
		setFilter(newFilter);
		const filtered = persons.filter((person) => {
			return person.name.toLowerCase().includes(newFilter);
		});
		//console.log(filtered);
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
			<PeopleNumberList
				filteredName={filteredName}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
