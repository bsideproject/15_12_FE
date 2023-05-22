'use client';

import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { SubmitHandler, useForm } from 'react-hook-form';

import ElInput from '@/components/elements/ElInput';
import useNavigation from '@/hooks/useNavigation';
import userPool from '@/utils/userPool';

interface LoginState extends React.InputHTMLAttributes<HTMLInputElement> {
	email: string;
	password: string;
}

interface LoginError extends Error {
	message: string;
	__type: string;
}

export default function ScreenLogin() {
	const navigation = useNavigation();

	const { register, handleSubmit, watch } = useForm<LoginState>();

	const authenticate = async (email: string, password: string): Promise<CognitoUserSession> =>
		new Promise((resolve, reject) => {
			const user = new CognitoUser({ Username: email, Pool: userPool });
			const authDetails = new AuthenticationDetails({ Username: email, Password: password });

			user.authenticateUser(authDetails, {
				onSuccess: (data) => {
					resolve(data);
				},
				onFailure: (err) => {
					reject(err);
				},
			});
		});

	const handleLogin: SubmitHandler<LoginState> = async (data) => {
		const { email, password } = data;
		try {
			const res = await authenticate(email, password);

			console.log(res);
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
		<section>
			<h2>로그인</h2>
			<form onSubmit={handleSubmit(handleLogin)}>
				<ElInput id="email" label="email" type="text" register={register('email')} />
				<ElInput id="password" label="password" type="password" register={register('password')} />
				<button
					className="bg-[#ff7777] disabled:bg-[#c9c9cb]"
					type="submit"
					disabled={Object.values(watch()).length === 0 || Object.values(watch()).includes('')}
				>
					login
				</button>
			</form>
			<button type="button" onClick={() => navigation.push('/register')}>
				회원가입 하러 가기
			</button>
		</section>
	);
}
