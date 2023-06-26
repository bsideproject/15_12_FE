'use client';

import { Auth } from 'aws-amplify';
import React, { useState } from 'react';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Back from 'public/images/back-sm-icon.svg';

import ElInput from '../elements/ElInput';
import ForgotPwdForm from '../modules/ForgotPwdForm';

export default function ScreenForgotPwd() {
	const navigation = useNavigation();

	const [userEmail, setUserEmail] = useState<string>('');
	const [sendEmail, setSendEmail] = useState<boolean>(false);

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserEmail(e.target.value);
	};

	const submitEmailCode = async () => {
		if (userEmail) {
			try {
				await Auth.forgotPassword(userEmail);
				alert('인증 코드가 발송되었습니다. 메일함 확인해주세요!');
				setSendEmail(true);
			} catch (err) {
				alert('인증 코드가 발송에 실패했습니다. 잠시후 다시 시도해 주세요.');
			}
		} else {
			alert('이메일을 입력해주세요!');
		}
	};

	const sectionClasses = clsxm('pt-[3.33%]', 'px-[6.67%]', 'pb-[8.33%]', 'flex', 'flex-col');
	const buttonClasses = clsxm('border-blue050', 'bg-transparent', 'text-h7', 'rounded', 'w-[26.60%]', 'ml-[2.56%]');
	const submitClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3rem]', 'rounded', 'w-full', 'disabled:bg-gray030');

	return (
		<section className={`${sectionClasses} ${!sendEmail ? 'justify-between h-real-screen' : ''}`}>
			<div>
				<div className="flex items-center mb-[10.26%]">
					<button type="button" onClick={() => navigation.push('/login')}>
						<Back />
					</button>
					<span className="text-p1 text-gray090 ml-[2.56%]">비밀번호 찾기</span>
				</div>
				<h2 className="text-h3 text-gray090 mb-[2.56%]">
					{!sendEmail ? '비밀번호를 잊으셨나요?' : '인증코드 발송 완료.'}
				</h2>
				<p className="text-p2 text-gray070 mb-[7.69%]">
					{!sendEmail
						? '이메일 주소를 입력하세요. 입력하신 메일로 인증코드가 발송됩니다.'
						: '이메일로 받은 인증코드를 입력하세요.'}
				</p>
				<div className="flex mb-[7.69%]">
					<ElInput
						id="email"
						type="text"
						placeholder="이메일을 입력해 주세요"
						_onChange={onChangeEmail}
						disabled={sendEmail}
						padding={sendEmail ? 'px-[10%] py-[6.04%]' : 'py-[4.65%] px-[7.69%]'}
					/>
					{sendEmail && (
						<button type="button" className={`${buttonClasses} border text-blue050`} onClick={submitEmailCode}>
							재전송
						</button>
					)}
				</div>
			</div>
			{!sendEmail ? (
				<button
					type="button"
					className={`${submitClasses} border text-white`}
					onClick={submitEmailCode}
					disabled={!userEmail}
				>
					인증코드 발송
				</button>
			) : (
				<ForgotPwdForm userEmail={userEmail} />
			)}
		</section>
	);
}
