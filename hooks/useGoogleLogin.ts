'use client';

import axios from 'axios';
import { useEffect } from 'react';

// import apiClient from '@/core';
import useNavigation from '@/hooks/useNavigation';

const useGoogleLogin = (code: string | null) => {
	const navigation = useNavigation();
	useEffect(() => {
		const getGoogleUserInfo = (access_token: string) => {
			axios
				.get(`https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/userInfo`, {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				})
				.then((res) => {
					const { email } = res.data;
					localStorage.setItem('email', email);
					navigation.push('/dashboard');
				})
				.catch((err) => {
					console.log('구글 사용자 정보 에러..', err);
				});
		};

		axios
			.post(
				`https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`,
				{
					grant_type: 'authorization_code',
					client_id: `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`,
					redirect_uri: `${process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI}`,
					code,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Access-Control-Allow-Origin': '*',
					},
				},
			)
			.then((res) => {
				const ACCESS_TOKEN = res.data.access_token;
				localStorage.setItem('token', ACCESS_TOKEN);
				alert('구글 로그인 성공!');
				getGoogleUserInfo(ACCESS_TOKEN);
			})
			.catch((err) => {
				console.log('구글 로그인 에러..', err);
				navigation.push('/');
			});
	}, [code, navigation]);
};

export default useGoogleLogin;
