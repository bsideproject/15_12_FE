'use client';

import React, { useEffect, useState } from 'react';

import ACTIVITY_FIGCAPTION from '@/constants/activityFigcaption';
import useNavigation from '@/hooks/useNavigation';
import useQueryActivities from '@/queries/queryFn/useQueryActivities';
import getUserAttributes from '@/service/getUserAttributes';
import clsxm from '@/service/mergeStyle';
import Logo from 'public/images/home-logo.svg';
import ButtonIcon from 'public/images/mytemplate-icon.svg';

import Sidebar from '../modules/Sidebar';

export default function ScreenHome() {
	const navigation = useNavigation();
	const [userName, setUserName] = useState<string | boolean>('');
	const [isSidebar, setIsSidebar] = useState<boolean>(false);

	const handleUserInfo = async () => {
		const info = await getUserAttributes();
		setUserName(info.nickname);
	};

	useEffect(() => {
		handleUserInfo();
	}, []);

	const handleToggleSide = () => {
		setIsSidebar(!isSidebar);
	};

	const { data } = useQueryActivities();

	const menuWrapClasses = clsxm('flex flex-col justify-between w-[20px] h-[12px]');
	const menuClasses = clsxm('block w-full bg-gray090 h-[2px]');
	const templateBtnClasses = clsxm('flex w-full p-[5.13%] mb-[5.13%] bg-[#F5F7F8] border border-gray020 rounded');
	const templateContentClasses = clsxm(
		'flex justify-between items-center flex-wrap [&>li:not(:nth-child(5),:nth-child(6))]:mb-[10.81%]',
	);

	return (
		<section className="p-[6.67%] relative">
			<div className="flex items-center justify-between mb-[8%]">
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
			<button type="button" className={templateBtnClasses}>
				<ButtonIcon />
				<p className="text-h7 text-gray090 ml-[2.88%]">내 템플릿 사용하기</p>
			</button>
			<ul className={templateContentClasses}>
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
							<div className="px-[10.81%] py-[16.22%] bg-white">
								<h3 className="text-h7 text-gray090 leading-[1.5625rem] mb-[5.41%]">{activity.display_name}</h3>
								<p className="text-sh3 text-[#5F6468]">{activity.description}</p>
							</div>
						</li>
					);
				})}
			</ul>
			<Sidebar isSidebar={isSidebar} handleToggleSide={handleToggleSide} userName={userName} />
		</section>
	);
}
