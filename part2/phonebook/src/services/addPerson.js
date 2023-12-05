import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const fetchAll = () => {
	const people = axios.get(baseUrl);
	return people.then((response) => response.data);
};

const addPerson = (person) => {
	const request = axios.post(baseUrl, person);
	return request.then((response) => response.data);
};

export default { fetchAll, addPerson };
