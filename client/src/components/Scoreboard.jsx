import React from "react";
import { Link } from "react-router-dom";

const Scoreboard = (props) => {
	console.log(props);
	let textContent = props.status;
	return (
		<>
			{textContent === "Black's Turn" ? (
				<h1
					style={{ color: "black" }}
					className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
				>
					{textContent}
				</h1>
			) : textContent === "Black Wins!" ? (
				<h1
					style={{ color: "black" }}
					className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
				>
					{textContent}
				</h1>
			) : textContent === "Red Wins!" ? (
				<h1
					style={{ color: "red" }}
					className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
				>
					{textContent}
				</h1>
			) : (
				<h1
					style={{ color: "red" }}
					className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
				>
					{textContent}
				</h1>
			)}
		</>
	);
};

export default Scoreboard;
