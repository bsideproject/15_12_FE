'use client';

import React, { useEffect, useState } from 'react';

import useNavigation from '@/hooks/useNavigation';
import useQueryActivities from '@/queries/queryFn/useQueryActivities';
import getUserAttributes from '@/service/getUserAttributes';

import ElGrid from '../elements/ElGrid';
import ActivityList from '../modules/ActivityList';
import HomeHead from '../modules/HomeHead';
import Sidebar from '../modules/Sidebar';

interface UserInfoState {
	[key: string]: string | boolean;
}

export default function ScreenHome() {
	const navigation = useNavigation();
	const [userInfo, setUserInfo] = useState<UserInfoState>({ email: '', nickname: '' });
	const [isSidebar, setIsSidebar] = useState<boolean>(false);

	const handleUserInfo = async () => {
		try {
			const info = await getUserAttributes();
			setUserInfo({ email: info.email, nickname: info.nickname });
		} catch (err) {
			setUserInfo({ email: '', nickname: '' });
		}
	};

	useEffect(() => {
		handleUserInfo();
	}, []);

	const handleToggleSide = () => {
		setIsSidebar(!isSidebar);
	};

	const { data } = useQueryActivities();

	const datatest = [
		{ activity_id: 1, display_name: '스피드게임', description: '자유 퀴즈를 만들고 정답을 맞혀보세요' },
		{ activity_id: 3, display_name: '감사 서클', description: '서로에게 감사한 일을 전해보세요' },
		{ activity_id: 2, display_name: '기분 체크인', description: '참여자의 기분을 점수로 확인해 보세요' },
		{ activity_id: 4, display_name: '미니 네트워킹', description: '소규모 네트워킹을 진행보세요' },
	];

	return (
		<ElGrid bottomSm>
			<HomeHead handleToggleSide={handleToggleSide} />
			<h2 className="text-h3 text-gray090 mb-[7.69%]">
				원하는 액티비티를 <br /> 선택하세요
			</h2>
			<ActivityList data={datatest} />
			<Sidebar
				isSidebar={isSidebar}
				handleToggleSide={handleToggleSide}
				userInfo={userInfo}
				handleUserInfo={handleUserInfo}
			/>
		</ElGrid>
	);
}
