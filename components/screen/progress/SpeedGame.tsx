'use client';

import { useEffect, useState } from 'react';

import SpeedOpenAnswer from '@/components/modules/SpeedOpenAnswer';
import SpeedOpenQuestion from '@/components/modules/SpeedOpenQuestion';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressSpeedGame() {
	const navigation = useNavigation();

	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('OPENED_QUESTION');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, publish, isConnect } = useTest(`/topic/speedgame/${roomName}`);

	const userToken = async () => {
		const session = await getUserSession();
		connect(position === 'organizer' ? { Autorization: `${session?.getAccessToken().getJwtToken()}` } : {}, 'test');
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [position]);

	useEffect(() => {
		publish(`/app/speedgame/${roomName}/start`);
	}, [isConnect]);

	const handleStep = (value: string) => {
		setStep(value);
	};

	return (
		<>
			{step === 'WAITING' && <Wait position={position} />}
			{step === 'OPENED_QUESTION' && <SpeedOpenQuestion position={position} handleStep={handleStep} />}
			{step === 'OPENED_ANSWER' && <SpeedOpenAnswer position={position} handleStep={handleStep} />}
			{/* {step === 'CLOSED_ROOM' && <Close />} */}
		</>
	);
}
