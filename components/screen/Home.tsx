'use client';

import React, { useEffect, useState } from 'react';

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

	const sectionClasses = clsxm('pt-[3.33%]', 'px-[6.67%]', 'pb-[8.33%]', 'relative');
	const menuWrapClasses = clsxm('flex flex-col justify-between w-[20px] h-[12px]');
	const menuClasses = clsxm('block w-full bg-gray090 h-[2px]');
	const activityContentClasses = clsxm(
		'flex justify-between items-center flex-wrap [&>li:not(:nth-child(3),:nth-child(4))]:mb-[5.13%]',
	);

	return (
		<section className={sectionClasses}>
			<div className="flex items-center justify-between mb-[8.17%]">
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
			<h2 className="text-h3 text-gray090 mb-[7.69%]">
				원하는 액티비티를 <br /> 선택하세요
			</h2>
			<ul className={activityContentClasses}>
				{data?.map((activity: any) => {
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
							<div className="pt-[13%] px-[10.96%] pb-[19.18%] bg-white">
								<h3 className="text-h7 text-gray090 leading-[1.5625rem] mb-[7.02%]">{activity.display_name}</h3>
								<p className="text-sh3 text-[#5F6468]">{activity.description}</p>
							</div>
						</li>
					);
				})}
			</ul>
			<Sidebar
				isSidebar={isSidebar}
				handleToggleSide={handleToggleSide}
				userInfo={userInfo}
				handleUserInfo={handleUserInfo}
			/>
		</section>
	);
}
