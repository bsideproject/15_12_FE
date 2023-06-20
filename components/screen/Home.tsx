'use client';

import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import ACTIVITY_FIGCAPTION from '@/constants/activityFigcaption';
import useNavigation from '@/hooks/useNavigation';
import useQueryActivities from '@/queries/queryFn/useQueryActivities';
import getUserAttributes from '@/service/getUserAttributes';
import getUserSession from '@/service/getUserSession';
import clsxm from '@/service/mergeStyle';
import Logo from 'public/images/home-logo.svg';
import ButtonIcon from 'public/images/mytemplate-icon.svg';

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
		{ activity_id: 1, display_name: '스피드 게임', description: '자유 퀴즈를 만들고 정답을 맞혀보세요' },
		{
			activity_id: 2,
			display_name: '진진자 게임',
			description: '두 개의 진실과 하나의 거짓을 찾아보세요',
		},
		{ activity_id: 3, display_name: '감사 서클', description: '서로에게 감사한 일을 전해보세요' },
		{ activity_id: 4, display_name: '기분 체크인', description: '참여자의 기분을 점수로 확인해 보세요' },
		{ activity_id: 5, display_name: '미니 네트워킹', description: '소규모 네트워킹을 진행보세요' },
		{ activity_id: 6, display_name: '이미지 게임', description: '질문에 가장 가까운 사람을 찾아보세요' },
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

	const menuWrapClasses = clsxm('flex flex-col justify-between w-[20px] h-[12px]');
	const menuClasses = clsxm('block w-full bg-gray090 h-[2px]');
	const templateBtnClasses = clsxm('flex w-full p-[5.13%] mb-[5.13%] bg-white border border-gray020 rounded');

	return (
		<section className="p-[6.67%]">
			<div className="flex items-center justify-between mb-[8%]">
				<div className="flex justify-between items-center w-[87px]">
					<Logo />
					<h1 className="text-h6 text-[#727488]">얼음땡</h1>
				</div>
				<div className={menuWrapClasses}>
					<span className={menuClasses} />
					<span className={menuClasses} />
					<span className={menuClasses} />
				</div>
			</div>
			<h2 className="text-h3 text-gray090 mb-[8%]">
				원하는 액티비티를 <br /> 선택하세요
			</h2>
			<button type="button" className={templateBtnClasses}>
				<ButtonIcon />
				<p className="text-h7 text-gray090 ml-[2.88%]">내 템플릿 사용하기</p>
			</button>
			<ul className="flex justify-between items-center flex-wrap [&>li:not(:nth-child(5),:nth-child(6))]:mb-[10.81%]">
				{datatest.map((activity) => {
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
			{/* <div>
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
			</button> */}
		</section>
	);
}
