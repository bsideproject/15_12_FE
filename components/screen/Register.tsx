'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function ScreenSignUp() {
	const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('회원가입');
	};
	return (
		<section>
			<h2>회원가입</h2>
			<form onSubmit={handleSignUp}>
				<label htmlFor="email">
					email
					<input id="email" type="text" />
				</label>
				<label htmlFor="password">
					password
					<input id="password" type="password" />
				</label>
				<label htmlFor="passwordConfirm">
					password 확인
					<input id="passwordConfirm" type="password" />
				</label>
				<button type="submit">sign up</button>
			</form>
		</section>
	);
}
