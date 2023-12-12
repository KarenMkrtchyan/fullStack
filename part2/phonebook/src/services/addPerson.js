import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const fetchAll = () => {
	const people = axios.get(baseUrl);
	return people.then((response) => {
		//console.log(response);
		return response.data;
	});
};

const addPerson = (person) => {
	const request = axios.post(baseUrl, person);
	return request.then((response) => response.data);
};

const updatePerson = (person, newNumber) => {
	const changedPerson = { name: person.name, number: newNumber };
	const request = axios.put(`${baseUrl}/${person.id}`, changedPerson);
	return request.then((response) => response.data);
};

const deletePerson = (person) => {
	//console.log("Delete", person.id);
	return axios.delete(`${baseUrl}/${person.id}`);
};

export default { fetchAll, addPerson, deletePerson, updatePerson };
