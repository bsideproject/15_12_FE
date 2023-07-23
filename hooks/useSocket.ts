'use client';

import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import SockJS from 'sockjs-client';

import { useCount, usePayload } from '@/atoms/socketAtoms';

interface ConnectAuthorizationType {
	[key: string]: string;
}

const useSocket = () => {
	const client = useRef<CompatClient>();
	const setPayload = useSetRecoilState(usePayload);
	const setCount = useSetRecoilState(useCount);

	const subscribe = (socketUrl: string, authorization: ConnectAuthorizationType, nickname?: string) => {
		if (client.current) {
			client.current.subscribe(
				`/topic/${socketUrl}`,
				(response) => {
					const jsonBody = JSON.parse(response.body);
					console.log(response.body);

					setPayload(jsonBody);
				},
				nickname ? { nickname } : undefined,
			);
			client.current.subscribe(
				`/topic/${socketUrl}/user-count`,
				(response) => {
					const jsonBody = JSON.parse(response.body);
					console.log(jsonBody, jsonBody.payload.current_participant_count);

					setCount(jsonBody.payload.current_participant_count);
				},
				nickname ? { nickname } : undefined,
			);
			if (Object.keys(authorization).length === 0 && nickname) {
				client.current.subscribe(
					'/user/queue/reply',
					(response) => {
						const jsonBody = JSON.parse(response.body);
						console.log(jsonBody, jsonBody.payload.participant_count);

						setCount(jsonBody.payload.participant_count + 1);
					},
					{ nickname },
				);
				client.current?.send(`/app/${socketUrl}/get-info`, {});
			}
		}
	};

	// ${process.env.NEXT_PUBLIC_API_SOCKET_URL}
	const connect = (socketUrl: string, authorization: ConnectAuthorizationType, nickname?: string) => {
		client.current = Stomp.over(() => {
			const sock = new SockJS(`${process.env.NEXT_PUBLIC_API_SOCKET_URL}`);
			return sock;
		});
		if (client.current) {
			client.current.connect(authorization, () => {
				if (nickname) {
					subscribe(socketUrl, authorization, nickname);
				} else {
					subscribe(socketUrl, authorization);
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

	return { connect, disconnect, publish };
};

export default useSocket;
