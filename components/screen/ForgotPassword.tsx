'use client';

import { Auth } from 'aws-amplify';

export default function ScreenForgotPassword() {
	const forgotPassword = () => {
		const username = prompt('가입하신 이메일을 입력해 주세요.');

		if (username) {
			Auth.forgotPassword(username)
				.then(() => {
					const verificationCode = prompt('입력하신 이메일로 발송된 코드를 입력해 주세요 ', '');
					const newPassword = prompt('새로운 비밀번호를 입력해 주세요.', '');
					Auth.forgotPasswordSubmit(username, verificationCode!, newPassword!)
						.then(() => alert('비밀번호가 변경되었습니다.'))
						.catch((err) => console.log(err));
				})
				.catch((err) => {
					console.log(err);
					alert('가입하지 않은 이메일입니다.');
				});
		}
	};

	return <div>비밀번호찾기</div>;
}
