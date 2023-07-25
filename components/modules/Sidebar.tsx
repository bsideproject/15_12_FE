'use client';

import { Auth } from 'aws-amplify';
import { useEffect } from 'react';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Close from 'public/images/close-icon.svg';
import Profile from 'public/images/profile-icon.svg';

interface SidebarProps {
	isSidebar: boolean;
	handleToggleSide: () => void;
	userInfo: { [key: string]: string | boolean };
	handleUserInfo: () => Promise<void>;
}

export default function Sidebar({ isSidebar, handleToggleSide, userInfo, handleUserInfo }: SidebarProps) {
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

	const logout = async () => {
		try {
			await Auth.signOut();
			alert('로그아웃!');
			handleUserInfo();
			handleToggleSide();
		} catch (error) {
			console.log('error signing out: ', error);
		}
	};

	const deleteUser = async () => {
		try {
			await Auth.deleteUser();
			alert('탈퇴가 정상적으로 완료되었습니다.');
			handleUserInfo();
			handleToggleSide();
		} catch (error) {
			console.log('Error deleting user', error);
		}
	};

	const handleMenuClick = () => {
		if (userInfo.email) {
			logout();
		} else {
			navigation.push('/login');
		}
	};

	const sidebarBgClasses = clsxm(
		` w-full h-real-screen absolute top-0 left-0  bg-[#000] opacity-50 ${isSidebar ? 'block' : 'hidden'}`,
	);
	const sidebarClasses = clsxm(
		` h-real-screen flex flex-col justify-between absolute top-0 right-0 w-[75%] bg-white ease-in-out duration-300 pt-[16.30%] px-[8.89%] pb-[11.11%] ${
			isSidebar ? 'translate-x-0 visible' : 'translate-x-full invisible'
		}`,
	);
	const menuClasses = clsxm('text-p2 text-gray090 mb-[8.88%]');
	const copylightClasses = clsxm('block text-gray070');
	const navButtonClasses = clsxm('text-gray070 underline');

	return (
		<>
			<div className={sidebarBgClasses} />
			<aside className={sidebarClasses}>
				<div>
					<button type="button" onClick={handleToggleSide} className="mb-[21.36%]">
						<Close />
					</button>
					<div>
						{userInfo.email && (
							<div className="flex items-center mb-[11.65%]">
								<Profile />
								<div className="ml-[7.77%]">
									<h3 className="text-h7 text-gray090">{userInfo.nickname}</h3>
									<span className="text-c text-gray070">{userInfo.email}</span>
								</div>
							</div>
						)}
						<button type="button" className={`${menuClasses} text-p2`} onClick={handleMenuClick}>
							{!userInfo.email ? '로그인/회원가입' : '로그아웃'}
						</button>
					</div>
				</div>
				<div>
					<h2 className="text-h7 text-gray090 mb-[3.36%]">얼음땡 팀</h2>
					<span className={`${copylightClasses} text-c`}>Copyright ©2023 얼음땡 Inc.</span>
					<span className={`${copylightClasses} text-c`}>All rights reserved.</span>
					<div className="mt-[5.8%]">
						<button className={`${navButtonClasses} text-c`} onClick={() => navigation.push('/policy?tab=privacy')}>
							개인정보처리방침
						</button>
						<button
							className={`${navButtonClasses} text-c ml-[8px]`}
							onClick={() => navigation.push('/policy?tab=service')}
						>
							이용약관
						</button>
						{userInfo.email && (
							<button className={`${navButtonClasses} text-c ml-[8px]`} onClick={deleteUser}>
								회원탈퇴
							</button>
						)}
					</div>
				</div>
			</aside>
		</>
	);
}
