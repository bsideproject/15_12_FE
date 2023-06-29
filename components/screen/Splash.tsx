'use client';

import useNavigation from '@/hooks/useNavigation';
import Logo from 'public/images/splash-logo.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

export default function ScreenSplash() {
	const navigation = useNavigation();

	return (
		<ElGrid between>
			<div className="text-center mt-[27.88%]">
				<Logo className="mx-auto w-[41.67%]" />
				<h2 className="text-h1 text-gray090 mt-[9.62%] mb-[3.85%]">어색한 사이 이제 끝!</h2>
				<p className="text-p2 text-gray090">
					꽁꽁 얼어붙은 어색함을 부숴줄 <br /> 아이스 브레이킹 도구 모음
				</p>
			</div>
			<ElButton type="button" _onClick={() => navigation.push('/on-boarding')}>
				시작하기
			</ElButton>
		</ElGrid>
	);
}
