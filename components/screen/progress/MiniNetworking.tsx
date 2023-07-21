'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import ThankList from '@/components/modules/ThankList';
import ThankTo from '@/components/modules/ThankTo';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import localStorage from '@/service/localStorage';

export default function ProgressMiniNetworking() {
	const navigation = useNavigation();

	const publish = useRecoilValue(usePublish);
	const payload = useRecoilValue(usePayload);

	const [position, setPosition] = useState<string>('');
	const [isWaiting, setIsWaiting] = useState<boolean>(true);

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

	return (
		<>
			{isWaiting && position === 'participant' && <Wait position={position} />}
			{payload?.type === 'OPENED_PARTICIPANT_LIST' && <div>라스트</div>}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
