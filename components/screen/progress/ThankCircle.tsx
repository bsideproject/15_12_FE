'use client';

import { useEffect, useState } from 'react';

import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressThankCircle() {
	const navigation = useNavigation();

	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('WAITING');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect } = useTest(`/topic/thankcircle/${roomName}`);

	const userToken = async () => {
		const session = await getUserSession();
		connect(position === 'organizer' ? { Autorization: `${session?.getAccessToken().getJwtToken()}` } : {});
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, []);

	const handleStep = (value: string) => {
		setStep(value);
	};

	return (
		<>
			{step === 'WAITING' && <Wait position={position} />}
			{step === 'READY' && <div />}
		</>
	);
}
