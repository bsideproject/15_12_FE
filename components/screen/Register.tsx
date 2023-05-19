'use client';

import React, { InputHTMLAttributes } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

interface UserInfo extends InputHTMLAttributes<HTMLInputElement> {
	email: string;
	password: string;
	passwordConfirm: string;
}

export default function ScreenRegister() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserInfo>();

	const handleSignUp: SubmitHandler<UserInfo> = (data) => console.log(data);

	return (
		<section>
			<h2>회원가입</h2>
			<form onSubmit={handleSubmit(handleSignUp)}>
				<label htmlFor="email">
					email
					<input id="email" type="text" {...register('email')} />
				</label>
				<label htmlFor="password">
					password
					<input id="password" type="password" {...register('password')} />
				</label>
				<label htmlFor="passwordConfirm">
					password 확인
					<input id="passwordConfirm" type="password" {...register('passwordConfirm')} />
				</label>
				<button type="submit">sign up</button>
			</form>
		</section>
	);
}
