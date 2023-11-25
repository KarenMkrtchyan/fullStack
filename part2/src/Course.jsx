const Header = ({ header }) => {
	return <h1>{header}</h1>;
};

const Part = ({ text, exercises }) => {
	return (
		<p>
			{text} {exercises}
		</p>
	);
};

const Course = ({ course }) => {
	const total = course.parts.reduce((sum, part) => {
		return sum + part.exercises;
	}, 0);

	return (
		<div>
			<Header header={course.name} />
			<ul>
				{course.parts.map((part) => (
					<Part key={part.id} text={part.name} exercises={part.exercises} />
				))}
			</ul>
			<h3>total of {total} exercises</h3>
		</div>
	);
};

export default Course;
