'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import userNickname from '@/atoms/userNickname';
import MoodPick from '@/components/modules/MoodPick';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressMoodCheckin() {
	const navigation = useNavigation();
	const nickname = useRecoilValue(userNickname);

	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('PICK');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, payload, publish } = useTest(`/topic/moodcheckin/${roomName}`);

	const userToken = async () => {
		const session = await getUserSession();
		if (session) {
			connect({ Authorization: `${session?.getAccessToken().getJwtToken()}` }, '주최자');
		} else {
			connect({}, nickname);
		}
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [roomName, nickname]);

	const handleStep = () => {
		publish(`/app/moodcheckin/${roomName}/start`);
	};

	const handleWaiting = () => {
		setStep('WAITING');
	};

	console.log(payload);

	return (
		<>
			{step === 'PICK' && <MoodPick handleWaiting={handleWaiting} />}
			{step === 'WAITING' && <Wait position={position} handleStep={handleStep} />}
		</>
	);
}
