'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import userNickname from '@/atoms/userNickname';
import Close from '@/components/modules/Close';
import ThankList from '@/components/modules/ThankList';
import ThankTo from '@/components/modules/ThankTo';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import localStorage from '@/service/localStorage';

export default function ProgressThankCircle() {
	const navigation = useNavigation();
	const nickname = useRecoilValue(userNickname);

	const [isMixing, setIsMixing] = useState<boolean>(true);
	const [position, setPosition] = useState<string>('');
	const [step, setStep] = useState<string>('WAITING');

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, payload, publish } = useTest(`/topic/thankcircle/${roomName}`);

	const userToken = async () => {
		const session = await getUserSession();
		if (session) {
			connect(
				{ Authorization: `${session?.getAccessToken().getJwtToken()}` },
				'주최자',
				`/app/thankcircle/${roomName}/start`,
			);
		} else {
			connect({}, nickname);
		}
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [roomName, nickname]);

	useEffect(() => {
		if (payload?.type === 'READY' || payload?.type === 'GUIDE_THANKS_TO' || payload?.type === 'CLOSED_ROOM') {
			setStep(payload.type);
		}
	}, [payload]);

	const handleStep = () => {
		publish(`/app/thankcircle/${roomName}/start`);
	};

	const handleClose = () => {
		publish(`/app/thankcircle/${roomName}/close`);
	};

	const handleIsMixing = () => {
		setIsMixing(false);
	};

	return (
		<>
			{step === 'WAITING' && position === 'participant' && <Wait position={position} />}
			{step === 'READY' && (
				<ThankList position={position} handleStep={handleStep} nicknameList={payload?.payload.nickname_list} />
			)}
			{step === 'GUIDE_THANKS_TO' && (
				<ThankTo
					position={position}
					handleStep={handleStep}
					handleClose={handleClose}
					thank={payload?.payload}
					handleIsMixing={handleIsMixing}
					isMixing={isMixing}
				/>
			)}
			{step === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
