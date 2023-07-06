'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const useTest = (soketUrl: string) => {
	const [payload, setPayload] = useState<string>('');
	const client = useRef<CompatClient>();

	const subscribe = (nickname?: string) => {
		if (client.current) {
			client.current.subscribe(
				soketUrl,
				(body) => {
					const jsonBody = JSON.parse(body.body);
					setPayload(jsonBody);
				},
				nickname ? { nickname } : {},
			);
		}
	};

	const connect = (accessToken?: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`/ws`);
			return sock;
		});
		if (client.current) {
			client.current.connect(accessToken ? { Authorization: accessToken } : {}, () => {
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
		client.current?.send(soketUrl, {}, JSON.stringify({}));
	};

	return { connect, disconnect, publish, payload };
};

export default useTest;
