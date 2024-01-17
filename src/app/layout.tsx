import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Blog',
	description: 'Next.js starter app',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="container">
					<Navbar />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
