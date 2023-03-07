import React from "react";
import crownWhite from "../assets/crownwhite.png";
import crown from "../assets/crown.png";

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
	console.log(input.value);

console.log(user);

	const handleHost = async (e) => {
		e.preventDefault();
		try {
			const { data } = await addGame(
				{
					variables: { id: user._id },
				}
			);
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

		const handleAddPlayer = async (e) => {
			e.preventDefault();
			try {
				const { data } = await addPlayerToGame(
					{
						variables: { id: user._id,
									gameid: input.value
								},
					}
				);
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};

	return (
		<>
			<section className="my-5 grid place-content-center align-middle">
				<div className="container my-4 max-w-6xl">
					<h1 className="font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
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
					<button id="hotseatBtn">Play Solo</button>
				</section>
				<section id="multiplayerContainer">
					<div id="hostContainer">
						<button id="hostBtn" onClick={handleHost}>Host a Game</button>
					</div>
					<div id="joinContainer">
						<input id="joinInput" maxLength={10} />
						<button id="joinBtn" onClick={handleAddPlayer}>Join a Friend</button>
					</div>
				</section>
			</div>
		</>
	);
};

export default Menu;
