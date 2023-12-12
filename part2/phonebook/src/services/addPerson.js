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

const deletePerson = (person) => {
	const request = axios.delete(baseUrl);
};

export default { fetchAll, addPerson };
