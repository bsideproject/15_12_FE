'use client';

import { useEffect, useState } from 'react';

import ThankList from '@/components/modules/ThankList';
import ThankMixing from '@/components/modules/ThankMixing';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressThankCircle() {
	const navigation = useNavigation();

	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('READY');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, publish } = useTest(
		`/topic/thankcircle/${roomName}`,
		`/app/thankcircle/${roomName}/start`,
	);

	const userToken = async () => {
		const session = await getUserSession();
		connect(position === 'organizer' ? { Autorization: `${session?.getAccessToken().getJwtToken()}` } : {}, 'test');
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [position]);

	const handleStep = (value: string) => {
		setStep(value);
	};

	return (
		<>
			{step === 'WAITING' && <Wait position={position} />}
			{step === 'READY' && <ThankList position={position} handleStep={handleStep} />}
			{step === 'MIXING' && <ThankMixing handleStep={handleStep} />}
			{step === 'GUIDE_THANKS_TO' && <div>ㅎ하</div>}
		</>
	);
}
