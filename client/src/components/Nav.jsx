import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Auth from '../utils/auth'

const stlyeClasses = {
	navBtn:
		'border-4 border-neutral-800 bg-neutral-50 hover:bg-neutral-200 px-4 py-1 font-base font-bold text-neutral-900',
	navBtnActive:
		'border-4 border-neutral-800 bg-neutral-50 hover:bg-neutral-200 px-4 py-1 font-base font-bold text-neutral-900 underline underline-offset-[7px] decoration-[3px]',
};

const Navigation = () => {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<nav className='m-2 flex justify-between'>
			<ul className='flex gap-1 sm:gap-3'>
				{/* placeholder links. eventually the login buton will trigger a modal w/ a login form */}
				{/* the /game link is just a way to switch pages from the menu to the game. we can change this up later */}
				<CustomLink to='/game'>game</CustomLink>
				{Auth.loggedIn() ? (
					<button className={stlyeClasses.navBtn} onClick={logout}>
						logout
					</button>
				) : (
					<CustomLink to='/login'>log in</CustomLink>
				)}
			</ul>
		</nav>
	);
};

// the CustomLink component is a wrapper around the Link component
// it just adds some styling to the Link component when it is active
// the 'to' prop is the path to the page that the Link component will navigate to
// the 'children' prop is the text that will be displayed in the Link component
export const CustomLink = ({ to, children, ...props }) => {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<button className={isActive ? stlyeClasses.navBtnActive : stlyeClasses.navBtn}>
			<Link className='flex h-full items-center px-2 py-1 text-lg' to={to} {...props}>
				{children}
			</Link>
		</button>
	);
};

export default Navigation;
