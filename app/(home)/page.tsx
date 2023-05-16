'use client';

export default function Page() {
	return (
		<main>
			<h2>메인페이지</h2>
			<button
				type="button"
				style={{
					padding: '12px',
					cursor: 'pointer',
					backgroundColor: '#AD6CAA',
					borderRadius: '4px',
					border: 'none',
					color: 'white',
					fontSize: '14px',
					margin: '18px',
				}}
				onClick={() => {
					throw new Error('Sentry Example Frontend Error');
				}}
			>
				error 버튼
			</button>
		</main>
	);
}
