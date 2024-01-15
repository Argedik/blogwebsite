import React from 'react';
import Link from 'next/link';

const NotFound = () => {
	return (
		<>
			<div>NotFound</div>
			<p>Üzgünüm, mevcutta olmayan bir sayfaya erişmeye çalışılıyor.</p>
			<Link href="/">Ana sayfaya geçebilirsiniz</Link>
		</>
	);
};

export default NotFound;
