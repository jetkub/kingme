import React from "react";
import crownWhite from "../assets/crownwhite.png";
import crown from "../assets/crown.png";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GAME } from "../utils/mutation";
import { ADD_PLAYER_TO_GAME } from "../utils/mutation";

import { QUERY_ME } from "../utils/queries";

const Menu = () => {
	const [addGame] = useMutation(CREATE_GAME);
	const [addPlayerToGame] = useMutation(ADD_PLAYER_TO_GAME);
	const { loading, data } = useQuery(QUERY_ME);
	const user = data?.me || {};

	const input = document.getElementById("joinInput");
	// console.log(input.value);

	console.log(user);

	const handleSolo = async () => {
		// @ricky we can add these to the db if we want
		// try {
		// 	const { data } = await addGame({
		// 		variables: { id: user._id },
		// 	});
		// 	console.log(data);
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	const handleHost = async () => {
		try {
			const { data } = await addGame({
				variables: { id: user._id },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddPlayer = async () => {
		try {
			const { data } = await addPlayerToGame({
				variables: { id: user._id, gameId: input.value },
			});
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<section className="my-5 grid place-content-center align-middle">
				<div className="container my-4 max-w-6xl">
					<h1 className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl my-10">
						kingme.gg
					</h1>
				</div>
			</section>
			<div id="menu">
				<section id="hotseatContainer">
					<div id="deco2">
						<img
							className="ml-6"
							id="decoImg"
							src={crownWhite}
							style={{ transform: "rotate(10deg)" }}
						/>
					</div>
					<div id="deco">
						<img
							className="ml-6"
							id="decoImg"
							src={crown}
							style={{ transform: "rotate(-10deg)" }}
						/>
					</div>
					<Link to="/hotseat">
						<button id="hotseatBtn" onClick={handleSolo}>
							Play Hot-Seat
						</button>
					</Link>
				</section>
				<section id="multiplayerContainer">
					<div id="hostContainer">
						<Link to="/multiplayer">
							<button id="hostBtn" onClick={handleHost}>
								Host a Game
							</button>
						</Link>
					</div>
					<div id="joinContainer">
						<input id="joinInput" maxLength={10} />
						<Link to="/multiplayer">
							<button id="joinBtn" onClick={handleAddPlayer}>
								Join a Friend
							</button>
						</Link>
					</div>
				</section>
			</div>
		</>
	);
};

export default Menu;
