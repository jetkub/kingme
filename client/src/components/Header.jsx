import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
	return (
		<>
			<div className='h-18 box-border flex items-center justify-between gap-8 bg-black px-4 text-lg text-white'>
				<Link to='/' className='justify-start font-base text-xl sm:text-2xl'>
					menu
				</Link>
				<Nav />
			</div>
			{/* hero text section -- font is set to custom "hero", check tailwin.config.cjs */}
			<section className='grid place-content-center align-middle'>
				<div className='container my-4 max-w-6xl'>
					{/* eventually this text will need to be dynamic to reflect the state in the current game (like the player's turn). we'll need to pass in props to this component to do that */}
					<h1 className='font-hero text-5xl sm:text-6xl md:text-7xl lg:text-8xl'>kingme.gg</h1>
				</div>
			</section>
		</>
	);
};

export default Header;
