'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef, useState } from 'react';
import SockJS from 'sockjs-client';

interface ConnectAuthorizationType {
	[key: string]: string;
}

const useTest = (soketUrl: string, publishUrl: string) => {
	const [payload, setPayload] = useState<string>('');
	const client = useRef<CompatClient>();

	const subscribe = (nickname?: string) => {
		if (client.current) {
			client.current.subscribe(
				soketUrl,
				(response) => {
					const jsonBody = JSON.parse(response.body);
					alert(JSON.stringify(jsonBody));
					setPayload(jsonBody);
				},
				nickname ? { nickname } : undefined,
			);
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			if (publishUrl) publish(publishUrl);
		}
	};

	const connect = (authorization: ConnectAuthorizationType, nickname?: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`/ws`);
			return sock;
		});
		if (client.current) {
			client.current.connect(authorization, () => {
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

	const publish = (
		sendUrl: string,
		value?: { [key: string]: number | string },
		e?: React.FormEvent<HTMLFormElement>,
	) => {
		if (e) e.preventDefault();
		if (!client.current?.connected) return;
		client.current?.send(sendUrl, {}, value ? JSON.stringify(value) : '');
	};

	return { connect, disconnect, publish, payload };
};

export default useTest;
