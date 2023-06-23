'use client';

import { Auth } from 'aws-amplify';

import clsxm from '@/service/mergeStyle';
import Back from 'public/images/back-s-icon.svg';

import ElInput from '../elements/ElInput';

export default function ScreenForgotPassword() {
	const forgotPassword = async () => {
		const username = prompt('가입하신 이메일을 입력해 주세요.');

		// if (username) {
		// 	Auth.forgotPassword(username)
		// 		.then((data) => {
		// 			console.log(data);
		// 			// const verificationCode = prompt('입력하신 이메일로 발송된 코드를 입력해 주세요 ', '');
		// 			// const newPassword = prompt('새로운 비밀번호를 입력해 주세요.', '');
		// 			// Auth.forgotPasswordSubmit(username, verificationCode!, newPassword!)
		// 			// 	.then(() => alert('비밀번호가 변경되었습니다.'))
		// 			// 	.catch((err) => console.log(err));
		// 		})
		// 		.catch((err) => {
		// 			// console.log(err);
		// 			// alert('가입하지 않은 이메일입니다.');
		// 		});
		// }

		if (username) {
			try {
				await Auth.forgotPassword(username);
				alert('인증 코드가 발송되었습니다. 메일함 확인해 주세요!');
			} catch (err) {
				console.log(err);
			}
		}
	};

	const sectionClasses = clsxm('pt-[3.33%]', 'px-[6.67%]', 'pb-[8.33%]', 'h-real-screen', 'flex', 'flex-col');
	const buttonClasses = clsxm(
		'border-blue050',
		'bg-transparent',
		'text-h7',
		'leading-[3rem]',
		'rounded',
		'w-[26.60%]',
		'ml-[5.13%]',
	);
	const formClasses = clsxm('flex', 'flex-col', 'justify-between', 'grow');
	const submitClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3rem]', 'rounded', 'w-full');

	return (
		<section className={sectionClasses}>
			<div>
				<div className="flex items-center mb-[10.26%]">
					<Back />
					<span className="text-p1 text-gray090 ml-[2.56%]">비밀번호 찾기</span>
				</div>
				<h2 className="text-h3 text-gray090 mb-[2.56%]">비밀번호가 기억나지 않으세요?</h2>
				<p className="text-p2 text-gray070 mb-[7.69%]">
					회원정보에 등록하신 이메일 주소로 임시로 비밀번호를 발급해드립니다.
				</p>
				<div className="flex mb-[2.56%]">
					<ElInput id="email" type="text" placeholder="아이디를 입력해 주세요" padding="py-[6.22%] px-[10.30%]" />
					<button type="button" className={`${buttonClasses} border text-blue050`} onClick={forgotPassword}>
						전송
					</button>
				</div>
			</div>
			<form className={formClasses}>
				<div>
					<ElInput id="code" type="text" placeholder="인증 코드 입력" />
					<ElInput id="password" type="password" placeholder="비밀번호를 입력해주세요" />
					<ElInput id="passwordConfirm" type="password" placeholder="비밀번호를 재입력해주세요" />
				</div>
				<button type="submit" className={`${submitClasses} text-white`}>
					비밀번호 변경
				</button>
			</form>
		</section>
	);
}
