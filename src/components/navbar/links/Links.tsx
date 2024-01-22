'use client';

import NavLink from './navLink/navLink';
import React, { useState } from 'react';
import styles from './links.module.css';
import Image from 'next/image';
import { handleLogout } from '@/lib/action';

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

// interface Session {
// 	user?: {
// 		isAdmin: boolean;
// 		session: boolean | null;
// 	};
// }
// interface LinksProps {
// 	session?: Session;
// }

const session = true;
const isAdmin = true;

interface Session {
	session: boolean;
}
interface LinksProps {
	session: Session | null;
}

const Links: React.FC<LinksProps> = ({ session }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.links}>
				{links.map((link) => (
					<NavLink item={link} key={link.title} />
				))}
				{session ? (
					<>
						{isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />}
						<form action={handleLogout}>
							<button className={styles.logout}>Logout</button>
						</form>
					</>
				) : (
					<NavLink item={{ title: 'Login', path: '/login' }} />
				)}
			</div>
			<Image
				className={styles.menuButton}
				src="/menu.png"
				alt=""
				width={30}
				height={30}
				onClick={() => setOpen((prev) => !prev)}
			/>
			{open && (
				<div className={styles.mobileLinks}>
					{links.map((link) => (
						<NavLink item={link} key={link.title} />
					))}
				</div>
			)}
		</div>
	);
};

export default Links;
