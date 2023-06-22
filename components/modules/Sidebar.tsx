'use client';

import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Back from 'public/images/back-icon.svg';

interface SidebarProps {
	isSidebar: boolean;
	handleToggleSide: () => void;
	userinfo: { [key: string]: string | boolean };
}

export default function Sidebar({ isSidebar, handleToggleSide, userinfo }: SidebarProps) {
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
			alert('로그아웃!');
		} catch (error) {
			console.log('error signing out: ', error);
		}
	};

	const handleMenuClick = () => {
		if (userinfo.email) {
			logout();
		} else {
			navigation.push('/login');
		}
	};

	const sidebarClasses = clsxm(
		`flex flex-col justify-between absolute top-0 right-0 w-[75%] h-real-screen bg-white ease-in-out duration-300 pt-[13.33%] pb-[8.33%] ${
			isSidebar ? 'translate-x-0 visible' : 'translate-x-full invisible'
		}`,
	);
	const menuClasses = clsxm('text-gray090 mb-[8.88%]');
	const copylightClasses = clsxm('block text-[#828282] leading-[1.0625rem]');

	return (
		<aside className={sidebarClasses}>
			<div>
				<button type="button" onClick={handleToggleSide} className="mb-[16.81%] ml-[5.93%]">
					<Back />
				</button>
				<div className="ml-[10.08%]">
					{userinfo.email && (
						<div>
							<h3>{userinfo.nickname}</h3>
							<span>{userinfo.email}</span>
						</div>
					)}
					<button type="button" className={`${menuClasses} text-p1`} onClick={handleMenuClick}>
						{!userinfo.email ? '로그인/회원가입' : '로그아웃'}
					</button>
				</div>
			</div>
			<div className="ml-[11.11%]">
				<h2 className="text-h7 text-gray090 mb-[3.36%]">얼음땡 팀</h2>
				<span className={`${copylightClasses} text-c`}>Copyright ©2023 얼음땡 Inc.</span>
				<span className={`${copylightClasses} text-c`}>All rights reserved.</span>
			</div>
		</aside>
	);
}
