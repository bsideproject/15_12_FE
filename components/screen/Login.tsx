'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import ElInput from '@/components/elements/ElInput';
import useNavigation from '@/hooks/useNavigation';

interface LoginState extends React.InputHTMLAttributes<HTMLInputElement> {
	email: string;
	password: string;
}

export default function ScreenLogin() {
	const { register, handleSubmit, watch } = useForm<LoginState>();

	const handleLogin: SubmitHandler<LoginState> = (data) => console.log(data);

	const navigation = useNavigation();

	return (
		<section>
			<form onSubmit={handleSubmit(handleLogin)}>
				<ElInput id="email" label="email" type="text" register={register('email')} />
				<ElInput id="password" label="password" type="password" register={register('password')} />
				<button type="submit" disabled={Object.values(watch()).length === 0 || Object.values(watch()).includes('')}>
					로그인
				</button>
			</form>
			<button type="button" onClick={() => navigation.push('/register')}>
				회원가입 하러 가기
			</button>
		</section>
	);
}
