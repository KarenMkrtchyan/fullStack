import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const addPerson = (event) => {
		event.preventDefault();

		const repeat = persons.filter((person) => {
			return person.name === newName;
		});
		console.log(repeat);
		if (repeat.length >0) {
			alert(`${newName} is already added to phonebook`);
			return false;
		}
		setPersons(persons.concat({ name: newName }));
		setNewName("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
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
					<button onClick={(event) => addPerson(event)} type="submit">
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => {
				return <div key={person.name}>{person.name}</div>;
			})}
		</div>
	);
};

export default App;
