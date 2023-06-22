'use client';

import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { SubmitHandler, useForm } from 'react-hook-form';

import ElInput from '@/components/elements/ElInput';
import useNavigation from '@/hooks/useNavigation';
import clsxm from '@/service/mergeStyle';
import Close from 'public/images/close-icon.svg';
import Google from 'public/images/google-icon.svg';
import Kakao from 'public/images/kakao-icon.svg';

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

	const sectionClasses = clsxm('pt-[3.33%]', 'px-[6.67%]', 'pb-[8.33%]', 'relative');
	const buttonClasses = clsxm('bg-blue050', 'text-h7', 'leading-[3rem]', 'rounded', 'w-full');
	const oauthClasses = clsxm('border', 'bg-white', 'w-[48px]', 'h-[48px]', 'rounded-[50%]');
	const registerBtnClasses = clsxm(
		'border-blue050',
		'bg-transparent',
		'text-h7',
		'leading-[3rem]',
		'rounded',
		'w-full',
		'mt-[5.13%]',
		'mb-[10.26%]',
	);

	return (
		<section className={sectionClasses}>
			<div className="flex justify-end mb-[11.54%]">
				<Close />
			</div>
			<h2 className="text-h3 text-gray090 mb-[5.13%]">로그인</h2>
			<form className="mb-[10.26%]" onSubmit={handleSubmit(handleLogin)}>
				<ElInput id="email" placeholder="아이디(이메일)" type="text" margin="mb-[2.56%]" register={register('email')} />
				<ElInput
					id="password"
					type="password"
					placeholder="비밀번호"
					margin="mb-[5.13%]"
					register={register('password')}
				/>
				<button
					className={`${buttonClasses} text-white`}
					type="submit"
					disabled={Object.values(watch()).length === 0 || Object.values(watch()).includes('')}
				>
					로그인
				</button>
			</form>
			<div className="text-center mb-[10.26%]">
				<span className="text-p2 text-gray070">또는 SNS 계정으로 로그인하기</span>
				<div className="flex justify-center items-center my-[5.13%]">
					<button
						className={`${oauthClasses} border-gray020`}
						type="button"
						onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
					>
						<Google className="mx-auto" />
					</button>
					<button
						className={`${oauthClasses} border-gray020 ml-[3.21%]`}
						type="button"
						onClick={() => Auth.federatedSignIn({ customProvider: 'kakao' })}
					>
						<Kakao className="mx-auto" />
					</button>
				</div>
				<hr className="border-none w-[19.23%] h-[1px] bg-gray020 mx-auto" />
			</div>
			<div className="text-center">
				<span className="text-p2 text-gray080">회원가입하고 나만의 템플릿을 만들어보세요!</span>
				<button
					type="button"
					className={`${registerBtnClasses} border text-blue050`}
					onClick={() => navigation.push('/register')}
				>
					회원가입 하기
				</button>
				<button className="text-p2 text-gray070" type="button" onClick={() => navigation.push('/forgot-password')}>
					비밀번호를 잊으셨나요?
				</button>
			</div>
		</section>
	);
}
