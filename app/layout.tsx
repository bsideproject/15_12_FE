import { Metadata } from 'next';

import ScreenLayout from '@/layout/screen/Layout';

import '../styles/globals.css';

export const metadata: Metadata = {
	title: '얼음땡 | 어색한 사이 이제 끝!',
	description: '꽁꽁 얼어붙은 어색함을 부숴줄 아이스 브레이킹 도구 모음',
	icons: {
		icon: '/favicon.ico',
	},
	openGraph: {
		images: [
			{
				url: 'https://bside1512.dev/images/openGraph/default-logo.png',
				width: 600,
				height: 315,
			},
		],
	},
	viewport: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <ScreenLayout className="layout bg-gray010">{children}</ScreenLayout>;
}
