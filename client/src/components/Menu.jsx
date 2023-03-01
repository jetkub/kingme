function Menu() {
	return (
		<div id="menu">
			<section id="hotseatContainer">
				<div id="deco2">
					<img
						id="decoImg"
						src="./assets/crownwhite.png"
						style="transform: rotate(10deg);"
					></img>
				</div>
				<div id="deco">
					<img
						id="decoImg"
						src="./assets/crown.png"
						style="transform: rotate(-10deg);"
					/>
				</div>
				<button id="hotseatBtn">Play Solo</button>
			</section>
			<section id="multiplayerContainer" style="display: flex">
				<div id="hostContainer" style="flex: 1">
					<button id="hostBtn">Host a Game</button>
				</div>
				<div id="joinContainer" style="flex: 1">
					<input id="joinInput" maxlength="5" />
					<button id="joinBtn">Join a Friend</button>
				</div>
			</section>
		</div>
	);
}
