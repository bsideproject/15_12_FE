'use client';

import useNavigation from '@/hooks/useNavigation';
import Close from 'public/images/close-icon.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import LoginForm from '../modules/LoginForm';
import LoginSocial from '../modules/LoginSocial';

export default function ScreenLogin() {
	const navigation = useNavigation();

	return (
		<ElGrid bottomSm>
			<div className="flex justify-end mb-[11.54%]">
				<button type="button" onClick={() => navigation.push('/home')}>
					<Close />
				</button>
			</div>
			<h2 className="text-h3 text-gray090 mb-[5.13%]">로그인</h2>
			<LoginForm />
			<LoginSocial />
			<div className="text-center">
				<span className="inline-block text-p3 text-gray080">회원가입하고 나만의 템플릿을 만들어보세요!</span>
				<ElButton type="button" _onClick={() => navigation.push('/register')} outline margin="mt-[3.85%] mb-[7.69%]">
					회원가입 하기
				</ElButton>
				<button className="text-p3 text-gray070" type="button" onClick={() => navigation.push('/forgot-pwd')}>
					비밀번호를 잊으셨나요?
				</button>
			</div>
		</ElGrid>
	);
}
