'use client';

import { Amplify, Auth } from 'aws-amplify';
// import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import awsConfig from 'aws-exports';
// import useGoogleLogin from '@/hooks/useGoogleLogin';

export default function GoogleLogin() {
	// 구글 로그인(endpoint)
	// const searchParams = useSearchParams();
	// const code = searchParams.get('code');
	// useGoogleLogin(code);

	// 구글 로그인(amplify)
	const [googleUser, setGoogleUser] = useState<any>(null);

	useEffect(() => {
		function getUser() {
			return Auth.currentAuthenticatedUser()
				.then((userData) => userData)
				.catch((err) => console.log('err:', err));
		}

		const isLocalhost = Boolean(window.location.hostname === 'localhost');

		// 두 개의 리다이렉션 URI가 있으며 첫 번째는 로컬 호스트용, 두 번째는 운영용으로 가정
		const [localRedirectSignIn, productionRedirectSignIn] = awsConfig.oauth.redirectSignIn.split(',');
		const [localRedirectSignOut, productionRedirectSignOut] = awsConfig.oauth.redirectSignOut.split(',');

		const updatedAwsConfig = {
			...awsConfig,
			oauth: {
				...awsConfig.oauth,
				redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
				redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
			},
		};

		Amplify.configure(updatedAwsConfig);

		getUser().then((userData) => setGoogleUser(userData));
	}, []);

	return (
		<div>
			<p>이름: {googleUser ? googleUser.username : 'none'}</p>
			<p>이메일: {googleUser ? googleUser.signInUserSession.idToken.payload.email : 'none'}</p>
			{googleUser && (
				<button type="button" onClick={() => Auth.signOut()}>
					구글 로그아웃(amplify)
				</button>
			)}
		</div>
	);
}
