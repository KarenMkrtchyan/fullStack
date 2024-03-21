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

const Notification = ({ message, styleClass }) => {
	if (message !== null) {
		return <div className={styleClass}>{message}</div>;
	}
	return <></>;
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
					key={person.id}
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
	const [message, setMessage] = useState(null);
	const [notificationStyle, setNotificationStyle] = useState(null);

	useEffect(() => {
		server.fetchAll().then((response) => {
			setPersons(response);
			setFilteredNames(response);
		});
	}, []);

	const deletePerson = (person) => {
		console.log(person);
		server
			.deletePerson(person)
			.then(() => {
				setPersons(persons.filter((p) => p.id !== person.id));
				setFilteredNames(persons.filter((p) => p.id !== person.id));
				setMessage(`${person.name} was sucessfully deleted`);
				setNotificationStyle("delete");
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			})
			.catch((error) => {
				setMessage(`${person.name} has already been deleted`);
				setNotificationStyle("error");
				setFilter("");
				setNewName("");
				setNewNumber("");
				server.fetchAll().then((response) => {
					setPersons(response);
					setFilteredNames(response);
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});
	};

	const addPerson = (event) => {
		//console.log("Calling addPerson");
		event.preventDefault();

		//Updateing an existing person
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
				server
					.updatePerson(personBeingChanged, newNumber)
					.then((response) => {
						server.fetchAll().then((response) => {
							setPersons(response);
							setFilteredNames(response);
							setMessage(`${newName} was sucessfully updated`);
							setNotificationStyle("success");
							setTimeout(() => {
								setMessage(null);
							}, 5000);
						});
					})
					.catch((e) => {
						console.log(e.message);
						setMessage(`${newName} was not updated`);
						setNotificationStyle("error");
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					});
			}
			return 0;
		}

		//Addiing a brand new person
		const newPerson = {
			name: newName,
			number: newNumber,
		};
		server
			.addPerson(newPerson)
			.then(() => {
				server.fetchAll().then((response) => {
					setPersons(response);
					setFilteredNames(response);
					setFilter("");
					setNewName("");
					setNewNumber("");
					setMessage(`${newName} was sucessfully created`);
					setNotificationStyle("success");
					setTimeout(() => {
						setMessage(null);
					}, 5000);
				});
			})
			.catch((error) => {
				console.log(error);
				setMessage(error.response.data.error);
				setNotificationStyle("error");
				setTimeout(() => {
					setMessage(null);
				}, 5000);
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
			<Notification message={message} styleClass={notificationStyle} />
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
