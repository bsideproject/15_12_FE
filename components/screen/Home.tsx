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

	// const { data } = useQueryActivities();

	const datatest = [
		{ activity_id: 1, display_name: '스피드게임', description: '자유 퀴즈를 만들고 정답을 맞혀보세요' },
		{
			activity_id: 2,
			display_name: '두 개의 진실 하나의 거짓말',
			description: '세 가지 정보 중 하나의 거짓을 찾아보세요',
		},
		{ activity_id: 3, display_name: '감사 서클', description: '참여자의 이름을 적어주세요' },
		{ activity_id: 4, display_name: '기분 체크인', description: '참여자의 오늘의 기분을 알아보세요!' },
		{ activity_id: 5, display_name: '미니 네트워킹', description: '그룹을 구성하여 네트워킹을 시작하세요' },
		{ activity_id: 6, display_name: '이미지 게임', description: '가장 ~ 할 것 같은 사람은?' },
	];

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
