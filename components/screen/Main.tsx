'use client';

import { useEffect, useState } from 'react';

import apiClient from '@/core';
import useNavigation from '@/hooks/useNavigation';
import getSession from '@/service/getUserInfo';
import userPool from '@/service/userPool';

export default function ScreenMain() {
	const navigation = useNavigation();
	const [userName, setUserName] = useState<string>('');

	const getUserInfo = async () => {
		const { attributes } = await getSession();
		setUserName(attributes.email);
	};

	const test = async () => apiClient.post('/api/test');

	useEffect(() => {
		getUserInfo();
		test();
	}, []);

	/**
	 * 로그아웃
	 */
	const logout = () => {
		const cognitoUser = userPool.getCurrentUser();

		if (cognitoUser) {
			cognitoUser.signOut();
			navigation.push('/');
		}
	};

	return (
		<section>
			<h2>{`회원 이메일: ${userName}`}</h2>
			<button type="button" onClick={logout}>
				로그아웃
			</button>
		</section>
	);
}
