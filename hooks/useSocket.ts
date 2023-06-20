'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const UseSocket = () => {
	/**
	 * soket 구현
	 */
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
			const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_SOCKET_URL}`);
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
};

export default UseSocket;
