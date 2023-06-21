'use client';

import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Close from 'public/images/back-icon.svg';

interface SidebarProps {
	isSidebar: boolean;
	handleToggleSide: () => void;
	userName: string | boolean;
}

export default function Sidebar({ isSidebar, handleToggleSide, userName }: SidebarProps) {
	const navigation = useNavigation();

	useEffect(() => {
		if (isSidebar) {
			document.body.style.cssText = `
          		position: fixed; 
          		top: -${window.scrollY}px;
          		overflow-y: scroll;
          		width: 100%;`;
		}
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, [isSidebar]);

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

	const sidebarClasses = clsxm(
		`flex flex-col justify-between absolute top-0 right-0 w-[75%] h-screen bg-white ease-in-out duration-300 pt-[13.33%] pb-[8.33%] px-[4.44%] ${
			isSidebar ? 'translate-x-0 visible' : 'translate-x-full invisible'
		}`,
	);
	const menuClasses = clsxm('text-gray090 mb-[8.88%]');
	const copylightClasses = clsxm('block text-[#828282] leading-[1.0625rem]');

	return (
		<aside className={sidebarClasses}>
			<div>
				<button type="button" onClick={handleToggleSide} className="mb-[16.81%]">
					<Close />
				</button>
				<ul className="ml-[10.08%]">
					<li className={`${menuClasses} text-h7 `}>홈</li>
					<li className={`${menuClasses} text-h7 `}>내 템플릿</li>
					<li className={`${menuClasses} text-h7 `}>{!userName ? '로그인/회원가입' : '로그아웃'}</li>
				</ul>
			</div>
			<div>
				<h2 className="text-h7 text-gray090 mb-[3.36%]">얼음땡 팀</h2>
				<span className={`${copylightClasses} text-c`}>Copyright ©2023 얼음땡 Inc.</span>
				<span className={`${copylightClasses} text-c`}>All rights reserved.</span>
			</div>
		</aside>
	);
}
