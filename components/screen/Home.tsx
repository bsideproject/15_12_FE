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

	return (
		<ElGrid bottomSm>
			<HomeHead handleToggleSide={handleToggleSide} />
			<h2 className="text-h3 text-gray090 mb-[7.69%]">
				원하는 액티비티를 <br /> 선택하세요
			</h2>
			<ActivityList data={data} />
			<Sidebar
				isSidebar={isSidebar}
				handleToggleSide={handleToggleSide}
				userInfo={userInfo}
				handleUserInfo={handleUserInfo}
			/>
		</ElGrid>
	);
}
