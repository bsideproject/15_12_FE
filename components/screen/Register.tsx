'use client';

import ElGrid from '../elements/ElGrid';
import BackHead from '../modules/BackHead';
import RegisterForm from '../modules/RegisterForm';

export default function ScreenRegister() {
	return (
		<ElGrid autoHeight bottomSm>
			<BackHead>회원가입</BackHead>
			<h2 className="text-h3 text-gray090 mb-[5.13%]">
				안녕하세요.
				<br />
				얼음땡에 오신 것을 환영해요!
			</h2>
			<RegisterForm />
		</ElGrid>
	);
}
