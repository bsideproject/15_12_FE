'use client';

import { useEffect, useState } from 'react';

import getSession from '@/service/getUserInfo';

export default function ScreenMain() {
	const [userName, setUserName] = useState<string>('');

	const getUserInfo = async () => {
		const userInfo = await getSession();
		setUserName(userInfo.attributes.email);
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return <h2>{`회원 이메일: ${userName}`}</h2>;
}
