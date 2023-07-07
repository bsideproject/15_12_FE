'use client';

import { useEffect } from 'react';

import localStorage from '@/service/localStorage';

export default function ScreenWait() {
	useEffect(() => {
		const item = localStorage.get();
		console.log(item);
	}, []);

	return <div>dd</div>;
}
