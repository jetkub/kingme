import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";



const Scoreboard = (props) => {
 
	const { loading, data } = useQuery(QUERY_ME);
	const user = data?.me || {};
	console.log(user);
	
	console.log(props);
	let textContent = props.status;
	return (
		<div className="my-10">
			{textContent === "Black Wins!" ? (
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
			) : textContent === `${user.username}'s Turn` ? (
				<h1
					style={{ color: "black" }}
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
		</div>
	);
};

export default Scoreboard;
