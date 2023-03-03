import React from 'react'


const Menu = () => {
	return (
		<div id="menu">
		  <section id="hotseatContainer">
			<div id="deco2">
			  <img id="decoImg" src="./assets/crownwhite.png" style={{transform: 'rotate(10deg)'}} />
			</div>
			<div id="deco">
			  <img id="decoImg" src="./assets/crown.png" style={{transform: 'rotate(-10deg)'}} />
			</div>
			<button id="hotseatBtn">Play Solo</button>
		  </section>
		  <section id="multiplayerContainer">
			<div id="hostContainer" >
			  <button id="hostBtn">Host a Game</button>
			</div>
			<div id="joinContainer">
			  <input id="joinInput" maxLength={5} />
			  <button id="joinBtn">Join a Friend</button>
			</div>
		  </section>
		</div>
	  );
}

export default Menu