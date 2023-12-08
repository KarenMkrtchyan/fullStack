import { useState, useEffect } from "react";

function App() {
	const [count, setCount] = useState("post");
	console.log("render");
  useEffect(()=>{
    console.log('magic')
  }, [count])
	return (
		<>
			<div>
				<button onClick={() => setCount("Post")}>Post</button>
				<button onClick={() => setCount("Users")}>Users</button>
				<button onClick={() => setCount("Comments")}>Comments</button>
			</div>
			<h1>{count}</h1>
		</>
	);
}

export default App;
