'use client';

import { Auth } from 'aws-amplify';
import React, { useState } from 'react';

import clsxm from '@/service/mergeStyle';
import Back from 'public/images/back-sm-icon.svg';

import ElInput from '../elements/ElInput';
import ForgotPwdForm from '../modules/ForgotPwdForm';

export default function ScreenForgotPwd() {
	const [userEmail, setUserEmail] = useState<string>('');

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserEmail(e.target.value);
	};

	const submitEmailCode = async () => {
		if (userEmail) {
			try {
				await Auth.forgotPassword(userEmail);
				alert('인증 코드가 발송되었습니다. 메일함 확인해주세요!');
			} catch (err) {
				alert('인증 코드가 발송에 실패했습니다. 잠시후 다시 시도해 주세요.');
			}
		} else {
			alert('이메일을 입력해주세요!');
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
					<ElInput
						id="email"
						type="text"
						placeholder="아이디를 입력해 주세요"
						padding="py-[6.22%] px-[10.30%]"
						_onChange={onChangeEmail}
					/>
					<button type="button" className={`${buttonClasses} border text-blue050`} onClick={submitEmailCode}>
						전송
					</button>
				</div>
			</div>
			<ForgotPwdForm userEmail={userEmail} />
		</section>
	);
}
