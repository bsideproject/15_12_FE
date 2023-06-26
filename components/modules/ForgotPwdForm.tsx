'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Check from 'public/images/check-sm-icon.svg';

import ElInput from '../elements/ElInput';

import PwdField from './PwdField';

const forgotPwdSchema = yup
	.object({
		code: yup.string().required(),
		password: yup
			.string()
			.min(8, '대소문자, 숫자, 특수문자 포함 8~20자 내로 입력해주세요')
			.max(20, '대소문자, 숫자, 특수문자 포함 8~20자 내로 입력해주세요')
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/,
				'대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.',
			)
			.required('대소문자, 숫자, 특수문자 포함 8~20자 내로 입력해주세요'),
		passwordConfirm: yup.string().oneOf([yup.ref('password')], '입력한 비밀번호를 한번 더 확인할게요'),
	})
	.required();

type UserForgotPwd = yup.InferType<typeof forgotPwdSchema>;

interface ShowIconState {
	[key: string]: boolean;
}

export default function ForgotPwdForm({ userEmail }: { userEmail: string }) {
	const navigation = useNavigation();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UserForgotPwd>({ mode: 'onChange', resolver: yupResolver(forgotPwdSchema) });

	const submitForgotPassword: SubmitHandler<UserForgotPwd> = async (data) => {
		try {
			await Auth.forgotPasswordSubmit(userEmail, data.code, data.password);
			alert('비밀번호가 변경되었습니다.');
			navigation.push('/login');
		} catch (err) {
			alert('비밀번호 변경에 실패했습니다.');
		}
	};

	const [show, setShow] = useState<ShowIconState>({ password: false, passwordConfirm: false });

	const handleInputType = (name: string) => {
		if (show[name]) {
			setShow((prev) => {
				return { ...prev, [name]: false };
			});
		} else {
			setShow((prev) => {
				return { ...prev, [name]: true };
			});
		}
	};

	const formClasses = clsxm('flex', 'flex-col', 'justify-between', 'grow');
	const submitClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3rem]', 'rounded', 'w-full', 'disabled:bg-gray030');
	const labelClasses = clsxm('text-gray090', 'mb-[2.56%]');

	return (
		<form className={formClasses} onSubmit={handleSubmit(submitForgotPassword)}>
			<div>
				<h3 className={`${labelClasses} text-h7`}>인증코드 입력</h3>
				<ElInput id="code" type="text" placeholder="인증 코드 입력" register={register('code')} />
				<div className="my-[7.69%]">
					<h3 className={`${labelClasses} text-h7`}>새 비밀번호</h3>
					<PwdField
						name="password"
						show={show.password}
						handleInputType={handleInputType}
						register={register('password')}
					/>
					<p
						className={`text-p2 mt-[2.56%] ${!watch().password || errors.password ? 'text-gray070' : 'text-green050'}`}
					>
						<Check
							className={`inline-block mr-[2.56%] ${
								!watch().password || errors.password ? '[&>path]:stroke-gray070' : '[&>path]:stroke-green050'
							}`}
						/>
						대소문자, 숫자, 특수문자 포함 8~20자 내로 입력해주세요
					</p>
				</div>
				<div className="mb-[7.69%]">
					<h3 className={`${labelClasses} text-h7`}>새 비밀번호 확인</h3>
					<PwdField
						name="passwordConfirm"
						show={show.passwordConfirm}
						handleInputType={handleInputType}
						register={register('passwordConfirm')}
					/>
					<p
						className={`text-p2 mt-[2.56%] ${
							!watch().passwordConfirm || errors.passwordConfirm ? 'text-gray070' : 'text-green050'
						}`}
					>
						<Check
							className={`inline-block mr-[2.56%] ${
								!watch().passwordConfirm || errors.passwordConfirm
									? '[&>path]:stroke-gray070'
									: '[&>path]:stroke-green050'
							}`}
						/>
						{!watch().passwordConfirm || errors.passwordConfirm ? '입력한 비밀번호를 한번 더 확인할게요' : '일치합니다'}
					</p>
				</div>
			</div>
			<button
				type="submit"
				className={`${submitClasses} text-white`}
				disabled={
					Object.entries(errors).length > 0 ||
					Object.values(watch()).length === 0 ||
					Object.values(watch()).includes('')
				}
			>
				비밀번호 변경하기
			</button>
		</form>
	);
}
