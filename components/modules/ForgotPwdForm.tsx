'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';

import ElButton from '../elements/ElButton';
import ElInput from '../elements/ElInput';

import FormField from './FormField';
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
	const labelClasses = clsxm('text-gray090', 'mb-[1.28%]');

	const textHelperColor = (typing: string | undefined, err: FieldError | undefined) => {
		if (!typing) {
			return 'text-gray070';
		}
		if (err) {
			return 'text-orange050';
		}
		return 'text-green050';
	};

	return (
		<form className={formClasses} onSubmit={handleSubmit(submitForgotPassword)}>
			<div>
				<h3 className={`${labelClasses} text-h7`}>인증코드 입력</h3>
				<ElInput id="code" type="text" placeholder="인증 코드 입력" register={register('code')} />
				<FormField
					tilte="새 비밀번호"
					textHelper={textHelperColor(watch().password, errors.password)}
					iconHelper={!!(watch().password && !errors.password)}
					helper="대소문자, 숫자, 특수문자 포함 8~20자 내로 입력해주세요"
					margin="my-[7.69%]"
				>
					<PwdField
						name="password"
						show={show.password}
						handleInputType={handleInputType}
						err={!!errors.password}
						register={register('password')}
					/>
				</FormField>
				<FormField
					tilte="새 비밀번호 확인"
					textHelper={textHelperColor(watch().passwordConfirm, errors.passwordConfirm)}
					iconHelper={!!(watch().passwordConfirm && !errors.passwordConfirm)}
					helper={
						!watch().passwordConfirm || errors.passwordConfirm ? '입력한 비밀번호를 한번 더 확인할게요' : '일치합니다'
					}
					margin="mb-[10.26%]"
				>
					<PwdField
						name="passwordConfirm"
						show={show.passwordConfirm}
						handleInputType={handleInputType}
						err={!!errors.passwordConfirm}
						register={register('passwordConfirm')}
					/>
				</FormField>
			</div>
			<ElButton
				type="submit"
				disabled={
					Object.entries(errors).length > 0 ||
					Object.values(watch()).length === 0 ||
					Object.values(watch()).includes('')
				}
			>
				비밀번호 변경하기
			</ElButton>
		</form>
	);
}
