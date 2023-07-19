'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import SockJS from 'sockjs-client';

import { usePayload } from '@/atoms/socketAtoms';

interface ConnectAuthorizationType {
	[key: string]: string;
}

const UseSocket = () => {
	const client = useRef<CompatClient>();
	const [payload, setPayload] = useState<any>();
	const setUsePayload = useSetRecoilState(usePayload);

	const subscribe = (socketUrl: string, nickname?: string) => {
		if (client.current) {
			client.current.subscribe(
				socketUrl,
				(response) => {
					const jsonBody = JSON.parse(response.body);
					console.log(response.body);
					setPayload(jsonBody);
					setUsePayload(jsonBody);
				},
				nickname ? { nickname } : undefined,
			);
		}
	};

	// ${process.env.NEXT_PUBLIC_API_SOCKET_URL}
	const connect = (socketUrl: string, authorization: ConnectAuthorizationType, nickname?: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`/ws`);
			return sock;
		});
		if (client.current) {
			client.current.connect(authorization, () => {
				if (nickname) {
					subscribe(socketUrl, nickname);
				} else {
					subscribe(socketUrl);
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

	const publish = (sendUrl: string, value?: { [key: string]: number | string }) => {
		if (!client.current?.connected) return;
		client.current?.send(sendUrl, {}, value ? JSON.stringify(value) : '');
	};

	return { connect, disconnect, publish, payload };
};

export default UseSocket;
