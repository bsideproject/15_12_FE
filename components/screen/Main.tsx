'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
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

	const [messageList, setMessageList] = useState<string[]>([]);
	const [message, setMessage] = useState<string>('');

	const client = useRef<CompatClient>();

	const subscribe = () => {
		if (client.current) {
			client.current.subscribe('/topic/greetings', (body) => {
				const jsonBody = JSON.parse(body.body);
				setMessageList((prev) => [...prev, jsonBody.content]);
			});
		}
	};

	const connect = () => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_SOKET_URL}`);
			return sock;
		});

		if (client.current) {
			client.current.connect({}, () => {
				console.log('success');
				subscribe();
			});
		}
		client.current.activate();
	};

	const disconnect = () => {
		if (client.current) {
			client.current.deactivate();
		}
	};

	const publish = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!client.current?.connected) return;

		client.current?.send(
			'/app/hello',
			{},
			JSON.stringify({
				name: message,
			}),
		);

		setMessage('');
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
				<ul>
					{messageList?.map((msg) => {
						return <li key={msg}>{msg}</li>;
					})}
				</ul>
				<form onSubmit={publish}>
					<input
						type="text"
						value={message}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
					/>
					<button type="submit">전송</button>
				</form>
			</div>
		</section>
	);
}
