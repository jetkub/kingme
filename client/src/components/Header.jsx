import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
	return (
		<>
			<div className="h-18 box-border flex items-center justify-between gap-8 bg-black px-4 text-lg text-white">
				<Link to="/" className="justify-start font-base text-xl sm:text-2xl">
					menu
				</Link>
				<Nav />
			</div>
		</>
	);
};

export default Header;
