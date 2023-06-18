'use client';

import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import useNavigation from '@/hooks/useNavigation';
import useQueryActivities from '@/queries/queryFn/useQueryActivities';
import getUserAttributes from '@/service/getUserAttributes';
import getUserSession from '@/service/getUserSession';

export default function ScreenHome() {
	const navigation = useNavigation();
	const [userName, setUserName] = useState<string | boolean>('');

	const handleUserInfo = async () => {
		const info = await getUserAttributes();
		console.log(info);
		setUserName(info.nickname);
	};

	const test = async () => {
		const info = await getUserSession();

		console.log(info);
	};

	useEffect(() => {
		handleUserInfo();
		test();
	}, []);

	const { data } = useQueryActivities();

	console.log(data);

	/**
	 * 로그아웃
	 */
	const logout = async () => {
		try {
			await Auth.signOut();
			navigation.push('/');
		} catch (error) {
			console.log('error signing out: ', error);
		}
	};

	return (
		<section>
			<div>
				{userName ? (
					<h2>{`회원 이름: ${userName}`}</h2>
				) : (
					<button type="button" onClick={() => navigation.push('/login')}>
						로그인 안 하셨군요 (로그인 버튼)
					</button>
				)}
			</div>
			<button type="button" onClick={logout}>
				로그아웃
			</button>
		</section>
	);
}
