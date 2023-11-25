import { useState } from "react";

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, bad, neutral }) => {
	const all = good + neutral + bad;
	const average = (good - bad) / all;
	const positive = good / all + "%";
	if (all) {
		return (
			<div>
				<StatisticLine text={"good"} value={good} />
				<StatisticLine text={"bad"} value={bad} />
				<StatisticLine text={"neutral"} value={neutral} />
				<StatisticLine text={"all"} value={all} />
				<StatisticLine text={"average"} value={average} />
				<StatisticLine text={"positive"} value={positive} />
			</div>
		);
	}
	return <div>No feedback given</div>;
};
const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<div>
				<h1>give feedback</h1>
				<div>
					<Button onClick={() => setGood(good + 1)} text={"good"} />
					<Button onClick={() => setNeutral(neutral + 1)} text={"netral"} />
					<Button onClick={() => setBad(bad + 1)} text={"bad"} />
				</div>
			</div>
			<div>
				<h1>statistics</h1>
				<Statistics good={good} bad={bad} neutral={neutral} />
			</div>
		</div>
	);
};

export default App;
