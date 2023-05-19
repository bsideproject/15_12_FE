'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

import ElInput from '@/components/elements/ElInput';
import userPool from '@/utils/userPool';

const registerSchema = yup
	.object({
		email: yup.string().email('이메일 형식이 아닙니다.').required('이메일을 입력해 주세요.'),
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

type UserInfo = yup.InferType<typeof registerSchema>;

export default function ScreenRegister() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<UserInfo>({ mode: 'onChange', resolver: yupResolver(registerSchema) });

	const onSubmit: SubmitHandler<UserInfo> = (data) => {
		const { email, password } = data;

		const attribute = [new CognitoUserAttribute({ Name: 'email', Value: email })];

		userPool.signUp(email, password, attribute, [], (err, result) => {
			if (err) {
				console.log(err.message || JSON.stringify(err));
				alert('가입실패!');
				return;
			}
			console.log(result);
			alert('가입완료! 이메일 인증 후 로그인 하세요.');
		});
	};

	return (
		<section>
			<h2>회원가입</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ElInput id="email" label="email" register={register('email')} />
				<p>{errors.email?.message}</p>
				<ElInput id="password" label="password" register={register('password')} />
				<p>{errors.password?.message}</p>
				<ElInput id="passwordConfirm" label="password 확인" register={register('passwordConfirm')} />
				<p>{errors.passwordConfirm?.message}</p>
				<button
					type="submit"
					disabled={
						Object.entries(errors).length > 0 ||
						Object.values(watch()).length === 0 ||
						Object.values(watch()).includes('')
					}
				>
					sign up
				</button>
			</form>
		</section>
	);
}
