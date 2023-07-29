'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import SpeedOpenAnswer from '@/components/modules/SpeedOpenAnswer';
import SpeedOpenQuestion from '@/components/modules/SpeedOpenQuestion';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import localStorage from '@/service/localStorage';

export default function ProgressSpeedGame() {
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
		if (payload?.type === 'OPENED_QUESTION') {
			setIsWaiting(false);
		}
	}, [payload?.type === 'OPENED_QUESTION']);

	const handleStep = () => {
		publish(`/app/speedgame/${roomName}/start`);
	};

	return (
		<>
			{isWaiting && position === 'participant' && <Wait position={position} />}
			{payload?.type === 'OPENED_QUESTION' && (
				<SpeedOpenQuestion position={position} question={payload?.payload} handleStep={handleStep} publish={publish} />
			)}
			{payload?.type === 'OPENED_ANSWER' && (
				<SpeedOpenAnswer position={position} answer={payload?.payload} handleStep={handleStep} />
			)}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
