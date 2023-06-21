'use client';

import React, { useCallback, useEffect, useState } from 'react';

import ACTIVITY_FIGCAPTION from '@/constants/activityFigcaption';
import useNavigation from '@/hooks/useNavigation';
import useQueryActivities from '@/queries/queryFn/useQueryActivities';
import getUserAttributes from '@/service/getUserAttributes';
import clsxm from '@/service/mergeStyle';
import Logo from 'public/images/home-logo.svg';

import Sidebar from '../modules/Sidebar';

interface UserInfoState {
	[key: string]: string | boolean;
}

export default function ScreenHome() {
	const navigation = useNavigation();
	const [userinfo, setUserInfo] = useState<UserInfoState>({ email: '', nickname: '' });
	const [isSidebar, setIsSidebar] = useState<boolean>(false);

	const handleUserInfo = async () => {
		const info = await getUserAttributes();

		setUserInfo({ email: info.email, nickname: info.nickname });
	};

	useEffect(() => {
		handleUserInfo();
	}, []);

	const handleToggleSide = () => {
		setIsSidebar(!isSidebar);
	};

	const { data } = useQueryActivities();

	const sectionClasses = clsxm('pt-[4.44%]', 'px-[6.67%]', 'pb-[8.33%]', 'relative');
	const menuWrapClasses = clsxm('flex flex-col justify-between w-[20px] h-[12px]');
	const menuClasses = clsxm('block w-full bg-gray090 h-[2px]');
	const activityContentClasses = clsxm(
		'flex justify-between items-center flex-wrap [&>li:not(:nth-child(3),:nth-child(4))]:mb-[5.13%]',
	);

	const datatest = [
		{ activity_id: 1, display_name: '스피드 게임', description: '자유 퀴즈를 만들고 정답을 맞혀보세요' },
		{ activity_id: 2, display_name: '기분 체크인', description: '참여자의 기분을 점수로 확인해 보세요' },
		{ activity_id: 3, display_name: '감사 서클', description: '서로에게 감사한 일을 전해보세요' },
		{ activity_id: 4, display_name: '미니 네트워킹', description: '소규모 네트워킹을 진행보세요' },
	];

	return (
		<section className={sectionClasses}>
			<div className="flex items-center justify-between mb-[8.33%]">
				<div className="flex justify-between items-center w-[87px]">
					<Logo />
					<h1 className="text-h6 text-[#727488]">얼음땡</h1>
				</div>
				<button type="button" className={menuWrapClasses} onClick={handleToggleSide}>
					<span className={menuClasses} />
					<span className={menuClasses} />
					<span className={menuClasses} />
				</button>
			</div>
			<h2 className="text-h3 text-gray090 mb-[8%]">
				원하는 액티비티를 <br /> 선택하세요
			</h2>
			<ul className={activityContentClasses}>
				{datatest?.map((activity: any) => {
					return (
						<li
							key={activity.activity_id}
							className="w-[calc(50%-8px)] text-center border border-gray020 rounded overflow-hidden"
						>
							<div
								className="flex items-center justify-center"
								style={{ backgroundColor: `${ACTIVITY_FIGCAPTION[activity.display_name]?.color}` }}
							>
								{ACTIVITY_FIGCAPTION[activity.display_name]?.icon}
							</div>
							<div className="pt-[13.70%] px-[10.96%] pb-[19.18%] bg-white">
								<h3 className="text-h7 text-gray090 leading-[1.5625rem] mb-[7.02%]">{activity.display_name}</h3>
								<p className="text-sh3 text-[#5F6468]">{activity.description}</p>
							</div>
						</li>
					);
				})}
			</ul>
			<Sidebar isSidebar={isSidebar} handleToggleSide={handleToggleSide} userinfo={userinfo} />
		</section>
	);
}
