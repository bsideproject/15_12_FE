'use client';

import useNavigation from '@/hooks/useNavigation';

export default function ScreenDashboard() {
	const navigation = useNavigation();
	const userEmail = localStorage.getItem('email');

	return (
		<section>
			<h1>대시보드</h1>
			<h2>{`이메일: ${userEmail}`}</h2>
			<button
				type="button"
				onClick={() => {
					localStorage.removeItem('token');
					localStorage.removeItem('email');
					navigation.push('/');
				}}
			>
				구글 로그아웃
			</button>
		</section>
	);
}
