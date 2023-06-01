'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import useNavigation from '@/hooks/useNavigation';
import getSession from '@/service/getUserInfo';
import userPool from '@/service/userPool';

export default function ScreenMain() {
	const navigation = useNavigation();
	const [userName, setUserName] = useState<string>('');

	const getUserInfo = async () => {
		const { attributes } = await getSession();
		setUserName(attributes.email);
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	/**
	 * 로그아웃
	 */
	const logout = () => {
		const cognitoUser = userPool.getCurrentUser();

		if (cognitoUser) {
			cognitoUser.signOut();
			navigation.push('/');
		}
	};

	/**
	 * soket 구현
	 */

	const token = async () => {
		const { session } = await getSession();

		return `Bearer ${session?.getAccessToken().getJwtToken()}`;
	};

	const [message, setMessage] = useState();

	const client = useRef<CompatClient>();

	const subscribe = () => {
		if (client.current) {
			client.current.subscribe('/topic/greetings', (body) => {
				const jsonBody = JSON.parse(body.body);
				console.log(jsonBody);
				setMessage(jsonBody);
			});
			client.current.activate();
		}
	};

	const connect = () => {
		client.current = Stomp.over(() => {
			const sock = new SockJS('/ws');
			return sock;
		});

		if (client.current) {
			client.current.connect({}, () => {
				console.log('success');
				// subscribe();
			});
		}
	};

	const disconnect = () => {
		if (client.current) {
			client.current.deactivate();
		}
	};

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, []);

	return (
		<section>
			<h2>{`회원 이메일: ${userName}`}</h2>
			<button type="button" onClick={logout}>
				로그아웃
			</button>
			<div>
				<h3>채팅</h3>
			</div>
		</section>
	);
}
