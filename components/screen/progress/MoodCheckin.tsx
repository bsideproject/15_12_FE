'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import MoodCheckinPick from '@/components/modules/MoodCheckinPick';
import MoodCheckinResult from '@/components/modules/MoodCheckinResult';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import localStorage from '@/service/localStorage';

export default function ProgressMoodCheckin() {
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
		if (payload?.type === 'WAITING' || payload?.type === 'OPENED_AVERAGE') {
			setIsWaiting(false);
		}
	}, [payload?.type]);

	const handleIsWaiting = () => {
		setIsWaiting(true);
	};

	const handleStep = () => {
		publish(`/app/moodcheckin/${roomName}/start`);
	};

	const handleClose = () => {
		publish(`/app/moodcheckin/${roomName}/close`);
	};

	return (
		<>
			{isWaiting && <Wait position={position} handleStep={handleStep} />}
			{!isWaiting && payload?.type === 'WAITING' && <MoodCheckinPick handleIsWaiting={handleIsWaiting} />}
			{!isWaiting && payload?.type === 'OPENED_AVERAGE' && (
				<MoodCheckinResult position={position} handleClose={handleClose} />
			)}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
