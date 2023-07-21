'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import MiniNetworkingList from '@/components/modules/MiniNetworkingList';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import localStorage from '@/service/localStorage';

export default function ProgressMiniNetworking() {
	const navigation = useNavigation();

	const publish = useRecoilValue(usePublish);
	const payload = useRecoilValue(usePayload);

	const [position, setPosition] = useState<string>('');
	const [isWaiting, setIsWaiting] = useState<boolean>(true);
	const [isMatching, setIsMatching] = useState<boolean>(false);

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	useEffect(() => {
		if (payload?.type === 'OPENED_PARTICIPANT_LIST') {
			setIsWaiting(false);
		}
	}, [payload?.type === 'OPENED_PARTICIPANT_LIST']);

	const handleStep = () => {
		publish(`/app/mininetworking/${roomName}/start`);
	};

	const handleClose = () => {
		publish(`/app/mininetworking/${roomName}/close`);
	};

	const handleGropMatching = () => {
		setIsMatching(true);
	};

	return (
		<>
			{isWaiting && position === 'participant' && <Wait position={position} />}
			{payload?.type === 'OPENED_PARTICIPANT_LIST' && (
				<MiniNetworkingList
					position={position}
					handleGropMatching={handleGropMatching}
					participantList={payload?.payload}
				/>
			)}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
