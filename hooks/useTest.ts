'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef, useState } from 'react';
import SockJS from 'sockjs-client';

interface ConnectAuthorizationType {
	[key: string]: string;
}

const useTest = (soketUrl: string) => {
	console.log(soketUrl);
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

	const connect = (authorization: ConnectAuthorizationType, nickname?: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`/ws`);
			return sock;
		});
		if (client.current) {
			client.current.connect(authorization, () => {
				console.log('success');
				if (nickname) {
					subscribe(nickname);
				} else {
					subscribe();
				}
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
