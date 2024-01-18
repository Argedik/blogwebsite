import NavLink from './navLink/navLink';
import React, { useState } from 'react';
import styles from './navbar.module.css';

const Links = ({ session }) => {
	const [open, setOpen] = useState(false);
	const links = [
		{
			title: 'Homepage',
			path: '/',
		},
		{
			title: 'About',
			path: '/about',
		},
		{
			title: 'Contact',
			path: '/contact',
		},
		{
			title: 'Blog',
			path: '/blog',
		},
	];

	return (
		<div className={styles.links}>
			{links.map((link) => (
				<NavLink item={link} key={link.title} />
			))}
			{session?.user ? (
				<>
					{session.user?.isAdmin && (
						<NavLink item={{ title: 'Admin', path: '/admin' }} />
					)}
					<form>
						<button className={styles.logout}>Logout</button>
					</form>
				</>
			) : (
				<NavLink item={{ title: 'Login', path: '/login' }} />
			)}
		</div>
	);
};

export default Links;
