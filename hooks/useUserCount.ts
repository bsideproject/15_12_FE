'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef } from 'react';
import SockJS from 'sockjs-client';

const useUserCount = () => {
	const client = useRef<CompatClient>();

	const subscribe = (sendUrl: string, nickname: string) => {
		if (client.current) {
			client.current.subscribe(
				'/user/queue/reply',
				(response) => {
					const jsonBody = JSON.parse(response.body);
					console.log(jsonBody);
				},
				{ nickname },
			);
			client.current?.send(sendUrl, {});
		}
	};

	// ${process.env.NEXT_PUBLIC_API_SOCKET_URL}
	const connect = (sendUrl: string, nickname: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`/ws`);
			return sock;
		});
		if (client.current) {
			client.current.connect({}, () => {
				subscribe(sendUrl, nickname);
			});
		}
		client.current.activate();
	};

	const disconnect = () => {
		if (client.current) {
			client.current.deactivate();
		}
	};

	return { connect, disconnect };
};

export default useUserCount;
