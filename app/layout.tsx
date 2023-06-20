import { Metadata } from 'next';

import ScreenLayout from '@/layout/screen/Layout';

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
	viewport: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ScreenLayout className="layout bg-gray010">{children}</ScreenLayout>
			</body>
		</html>
	);
}
