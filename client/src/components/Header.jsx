import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import whiteCrown from "../assets/crownwhite.png";

const Header = () => {
	return (
		<>
			<div className="h-18 box-border flex items-center justify-between gap-8 bg-black px-4 text-lg text-white">
				<Link to="/" className="justify-start font-base text-xl sm:text-2xl">
					<img src={whiteCrown} className="h-8 w-8 mr-2" />
				</Link>
				<Nav />
			</div>
		</>
	);
};

export default Header;
