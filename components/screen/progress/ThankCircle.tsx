'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import ThankCircleList from '@/components/modules/ThankCircleList';
import ThankCircleResult from '@/components/modules/ThankCircleResult';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import localStorage from '@/service/localStorage';

export default function ProgressThankCircle() {
	const navigation = useNavigation();

	const publish = useRecoilValue(usePublish);
	const payload = useRecoilValue(usePayload);

	const [isMixing, setIsMixing] = useState<boolean>(true);
	const [position, setPosition] = useState<string>('');
	const [isWaiting, setIsWaiting] = useState<boolean>(true);

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	useEffect(() => {
		if (payload?.type === 'READY') {
			setIsWaiting(false);
		}
	}, [payload?.type === 'READY']);

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
			{isWaiting && position === 'participant' && <Wait position={position} />}
			{payload?.type === 'READY' && (
				<ThankCircleList position={position} handleStep={handleStep} nicknameList={payload?.payload.nickname_list} />
			)}
			{payload?.type === 'GUIDE_THANKS_TO' && (
				<ThankCircleResult
					position={position}
					handleStep={handleStep}
					handleClose={handleClose}
					thank={payload?.payload}
					handleIsMixing={handleIsMixing}
					isMixing={isMixing}
				/>
			)}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
