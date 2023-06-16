'use client';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Logo from 'public/images/splash-logo.svg';

export default function ScreenSplash() {
	const sectionClasses = clsxm('p-[6.67%]', 'flex', 'flex-col', 'justify-between', 'h-[100vh]');
	const buttonClasses = clsxm('bg-blue050', 'text-button', 'rounded', 'w-full');

	const navigation = useNavigation();

	return (
		<div className={sectionClasses}>
			<div className="text-center mt-[25.64%]">
				<Logo className="mx-auto" />
				<h2 className="text-h1 mt-[6.41%] mb-[3.85%]">어색한 사이 이제 끝!</h2>
				<p className="text-sh1">
					꽁꽁 얼어붙은 어색함을 부숴줄 <br /> 아이스 브레이킹 도구 모음
				</p>
			</div>
			<button type="button" className={`${buttonClasses} text-white`} onClick={() => navigation.push('/onBoarding')}>
				시작하기
			</button>
		</div>
	);
}
