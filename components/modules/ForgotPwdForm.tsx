'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';

import ElInput from '../elements/ElInput';

import PwdField from './PwdField';

const forgotPwdSchema = yup
	.object({
		code: yup.string().required(),
		password: yup
			.string()
			.min(8, '대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.')
			.matches(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/,
				'대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.',
			)
			.required('대소문자, 특수문자, 숫자 포함 8자리 이상 입력해주세요.'),
		passwordConfirm: yup.string().oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
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
	const submitClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3rem]', 'rounded', 'w-full');

	return (
		<form className={formClasses} onSubmit={handleSubmit(submitForgotPassword)}>
			<div>
				<ElInput id="code" type="text" placeholder="인증 코드 입력" register={register('code')} />
				<div className="my-[2.56%]">
					<PwdField
						name="password"
						show={show.password}
						handleInputType={handleInputType}
						register={register('password')}
					/>
					<p className="text-p2 text-gray070">{errors.password?.message}</p>
				</div>
				<div>
					<PwdField
						name="passwordConfirm"
						show={show.passwordConfirm}
						handleInputType={handleInputType}
						register={register('passwordConfirm')}
					/>
					<p className="text-p2 text-gray070">{errors.passwordConfirm?.message}</p>
				</div>
			</div>
			<button type="submit" className={`${submitClasses} text-white`}>
				비밀번호 변경
			</button>
		</form>
	);
}
