'use client';

import { useEffect, useState } from 'react';

import Close from '@/components/modules/Close';
import SpeedOpenAnswer from '@/components/modules/SpeedOpenAnswer';
import SpeedOpenQuestion from '@/components/modules/SpeedOpenQuestion';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useSocketHyo from '@/hooks/useSocketHyo';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressSpeedGame() {
	const navigation = useNavigation();

	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('WAITING');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, payload, publish } = useSocketHyo(`/topic/speedgame/${roomName}`);

	const userToken = async () => {
		const session = await getUserSession();
		if (session) {
			connect({ Authorization: `${session?.getAccessToken().getJwtToken()}` }, `/app/speedgame/${roomName}/start`);
		} else {
			connect({});
		}
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	});

	useEffect(() => {
		if (!payload?.type) {
			setStep('WAITING');
		} else if (
			payload?.type === 'OPENED_QUESTION' ||
			payload?.type === 'OPENED_ANSWER' ||
			payload?.type === 'CLOSED_ROOM'
		) {
			setStep(payload.type);
		}
	}, [payload]);

	const handleStep = () => {
		publish(`/app/speedgmae/${roomName}/start`);
	};

	return (
		<>
			{step === 'WAITING' && position === 'participant' && <Wait position={position} />}
			{step === 'OPENED_QUESTION' && <SpeedOpenQuestion position={position} handleStep={handleStep} />}
			{step === 'OPENED_ANSWER' && <SpeedOpenAnswer position={position} handleStep={handleStep} />}
			{step === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
