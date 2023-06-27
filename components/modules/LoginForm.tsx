'use client';

import { Auth } from 'aws-amplify';
import { SubmitHandler, useForm } from 'react-hook-form';

import useNavigation from '@/hooks/useNavigation';

import ElButton from '../elements/ElButton';
import ElInput from '../elements/ElInput';

interface LoginState extends React.InputHTMLAttributes<HTMLInputElement> {
	email: string;
	password: string;
}

interface LoginError extends Error {
	message: string;
	__type: string;
}

export default function LoginForm() {
	const navigation = useNavigation();

	const { register, handleSubmit, watch } = useForm<LoginState>();

	const handleLogin: SubmitHandler<LoginState> = async (data) => {
		const { email, password } = data;

		try {
			await Auth.signIn(email, password);
			navigation.push('/home');
		} catch (err: unknown) {
			const loginError = err as LoginError;

			switch (loginError.message) {
				case 'User is not confirmed.':
					alert('가입한 이메일을 인증해주세요.');
					break;
				case 'Incorrect username or password.':
					alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
					break;
				default:
					break;
			}

			console.log(err);
		}
	};

	return (
		<form className="mb-[7.69%]" onSubmit={handleSubmit(handleLogin)}>
			<ElInput id="email" placeholder="아이디(이메일)" type="text" margin="mb-[2.56%]" register={register('email')} />
			<ElInput
				id="password"
				type="password"
				placeholder="비밀번호"
				margin="mb-[5.13%]"
				register={register('password')}
			/>
			<ElButton type="submit" disabled={Object.values(watch()).length === 0 || Object.values(watch()).includes('')}>
				로그인
			</ElButton>
		</form>
	);
}
