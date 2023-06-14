'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { Amplify, Auth } from 'aws-amplify';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

import useNavigation from '@/hooks/useNavigation';
import getUserAttributes from '@/service/getUserAttributes';
import getUserSession from '@/service/getUserSession';
import awsConfig from 'aws-exports';

Amplify.configure(awsConfig);

export default function ScreenMain() {
	const navigation = useNavigation();
	const [userName, setUserName] = useState<string | boolean>('');

	const handleUserInfo = async () => {
		const info = await getUserAttributes();

		setUserName(info.name);
	};

	const test = async () => {
		const info = await getUserSession();

		console.log(info);
	};

	useEffect(() => {
		handleUserInfo();
		test();
	}, []);

	/**
	 * 로그아웃
	 */
	const logout = async () => {
		try {
			await Auth.signOut();
			navigation.push('/');
		} catch (error) {
			console.log('error signing out: ', error);
		}
	};

	/**
	 * soket 구현
	 */

	// const token = async () => {
	// 	const { session } = await getSession();

	// 	return `Bearer ${session?.getAccessToken().getJwtToken()}`;
	// };

	// const [messageList, setMessageList] = useState<string[]>([]);
	// const [message, setMessage] = useState<string>('');

	// const client = useRef<CompatClient>();

	// const subscribe = () => {
	// 	if (client.current) {
	// 		client.current.subscribe('/topic/greetings', (body) => {
	// 			const jsonBody = JSON.parse(body.body);
	// 			setMessageList((prev) => [...prev, jsonBody.content]);
	// 		});
	// 	}
	// };

	// const connect = () => {
	// 	client.current = Stomp.over(() => {
	// 		const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_SOCKET_URL}`);
	// 		return sock;
	// 	});

	// 	if (client.current) {
	// 		client.current.connect({}, () => {
	// 			console.log('success');
	// 			subscribe();
	// 		});
	// 	}
	// 	client.current.activate();
	// };

	// const disconnect = () => {
	// 	if (client.current) {
	// 		client.current.deactivate();
	// 	}
	// };

	// const publish = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();

	// 	if (!client.current?.connected) return;

	// 	client.current?.send(
	// 		'/app/hello',
	// 		{},
	// 		JSON.stringify({
	// 			name: message,
	// 		}),
	// 	);

	// 	setMessage('');
	// };

	// useEffect(() => {
	// 	connect();

	// 	return () => {
	// 		disconnect();
	// 	};
	// }, []);

	return (
		<section>
			<h2>{`회원 이름: ${userName}`}</h2>
			<button type="button" onClick={logout}>
				로그아웃
			</button>
			{/* <div>
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
			</div> */}
		</section>
	);
}
