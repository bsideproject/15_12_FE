'use client';

import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { Amplify, Auth } from 'aws-amplify';
import { SubmitHandler, useForm } from 'react-hook-form';

import ElInput from '@/components/elements/ElInput';
import useNavigation from '@/hooks/useNavigation';
import user from '@/service/user';
import awsConfig from 'aws-exports';

Amplify.configure(awsConfig);

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

	const authenticate = (email: string, password: string): Promise<CognitoUserSession> =>
		new Promise((resolve, reject) => {
			const authDetails = new AuthenticationDetails({ Username: email, Password: password });

			user(email).authenticateUser(authDetails, {
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

			navigation.push('/main');
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

	const forgotPassword = () => {
		const username = prompt('가입하신 이메일을 입력해 주세요.');

		if (username) {
			user(username).forgotPassword({
				onSuccess: (result) => {
					console.log(`call result: ${result}`);
				},
				onFailure: (err) => {
					alert(JSON.stringify(err));
				},
				inputVerificationCode() {
					const verificationCode = prompt('입력하신 이메일로 발송된 코드를 입력해 주세요 ', '');
					const newPassword = prompt('새로운 비밀번호를 입력해 주세요.', '');
					user(username).confirmPassword(verificationCode!, newPassword!, {
						onSuccess() {
							alert('비밀번호가 변경되었습니다.');
						},
						onFailure(err) {
							console.log('error');
						},
					});
				},
			});
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
			<button type="button" onClick={forgotPassword}>
				비밀번호 찾기
			</button>
			<button type="button" onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
				구글 로그인(amplify)
			</button>
		</section>
	);
}
