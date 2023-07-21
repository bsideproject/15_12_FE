'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import MoodPick from '@/components/modules/MoodPick';
import MoodPickToday from '@/components/modules/MoodPickToday';
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
		if (position === 'organizer' && publish) {
			publish(`/app/moodcheckin/${roomName}/start`);
		}
	}, [position, publish]);

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

	console.log(isWaiting);

	return (
		<>
			{isWaiting && <Wait position={position} handleStep={handleStep} />}
			{payload?.type === 'WAITING' && <MoodPick handleIsWaiting={handleIsWaiting} />}
			{payload?.type === 'OPENED_AVERAGE' && <MoodPickToday position={position} handleClose={handleClose} />}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
