import React from 'react';
import crownWhite from '../assets/crownwhite.png';
import crown from '../assets/crown.png';

const Menu = () => {
	return (
		<div id='menu'>
			<section id='hotseatContainer'>
				<div id='deco2'>
					<img className='ml-6' id='decoImg' src={crownWhite} style={{ transform: 'rotate(10deg)' }} />
				</div>
				<div id='deco'>
					<img className='ml-6' id='decoImg' src={crown} style={{ transform: 'rotate(-10deg)' }} />
				</div>
				<button id='hotseatBtn'>Play Solo</button>
			</section>
			<section id='multiplayerContainer'>
				<div id='hostContainer'>
					<button id='hostBtn'>Host a Game</button>
				</div>
				<div id='joinContainer'>
					<input id='joinInput' maxLength={5} />
					<button id='joinBtn'>Join a Friend</button>
				</div>
			</section>
		</div>
	);
};

export default Menu;
