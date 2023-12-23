import axios from "axios";
const baseUrl = "/api/persons";

const fetchAll = () => {
	const people = axios.get(baseUrl);
	return people.then((response) => {
		//console.log(response);
		return response.data;
	});
};

const addPerson = (person) => {
	const request = axios.post(baseUrl, person);
	console.log(person);
	return request.then((response) => response.data);
};

const updatePerson = (person, newNumber) => {
	console.log(person);
	const changedPerson = {
		id: person.id,
		name: person.name,
		number: newNumber,
	};
	//console.log("changedPerson", changedPerson);
	const request = axios.put(`${baseUrl}/${person.id}`, changedPerson);
	return request.then((response) => response.data);
};

const deletePerson = (person) => {
	console.log("Delete", person);
	return axios.delete(`${baseUrl}/${person.id}`);
};

export default { fetchAll, addPerson, deletePerson, updatePerson };
