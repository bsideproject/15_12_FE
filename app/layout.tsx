import { Metadata } from 'next';

import '../styles/globals.css';

export const metadata: Metadata = {
	title: 'Next.js',
	description: 'Next.js',
	/**
	 * todo: 추후 favicon 작업할 때 경로 바꿔 주기.
	 */
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
