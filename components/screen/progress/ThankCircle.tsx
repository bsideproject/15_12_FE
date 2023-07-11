'use client';

import { useEffect, useState } from 'react';

import ThankList from '@/components/modules/ThankList';
import ThankTo from '@/components/modules/ThankTo';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressThankCircle() {
	const navigation = useNavigation();

	const [isMixing, setIsMixing] = useState<boolean>(true);
	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('READY');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, publish, isConnect } = useTest(`/topic/thankcircle/${roomName}`);

	const userToken = async () => {
		const session = await getUserSession();
		connect(position === 'organizer' ? { Autorization: `${session?.getAccessToken().getJwtToken()}` } : {}, 'test');
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [position]);

	useEffect(() => {
		publish(`/app/thankcircle/${roomName}/start`);
	}, [isConnect]);

	const handleStep = (value: string) => {
		setStep(value);
	};

	const handleIsMixing = () => {
		setIsMixing(false);
	};

	return (
		<>
			{step === 'WAITING' && <Wait position={position} />}
			{step === 'READY' && <ThankList position={position} handleStep={handleStep} />}
			{step === 'GUIDE_THANKS_TO' && (
				<ThankTo position={position} handleStep={handleStep} handleIsMixing={handleIsMixing} isMixing={isMixing} />
			)}
		</>
	);
}
