import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>Argedik</div>
			<div className={styles.text}>
				Argedik creative thoughts agency © All rights reserved.
			</div>
		</div>
	);
};
export default Footer;
