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
	const [moodNum, setMoodNum] = useState<number>(0);

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	useEffect(() => {
		if (payload.type === 'WAITING' || payload?.type === 'OPENED_AVERAGE') {
			setIsWaiting(false);
		}
	}, [payload.type]);

	const handleStep = () => {
		publish(`/app/moodcheckin/${roomName}/start`);
	};

	const handleClose = () => {
		publish(`/app/moodcheckin/${roomName}/close`);
	};

	// 기분 체크
	const onChangePickMood = (value: number) => {
		setMoodNum(value);
	};

	const onSendPickMood = () => {
		if (moodNum === 0) {
			alert('선택해 주세요.');
			return;
		}
		publish(`/app/moodcheckin/${roomName}/submit-mood`, { mood: moodNum });
		setIsWaiting(true);
	};

	return (
		<>
			{isWaiting && <Wait position={position} handleStep={handleStep} />}
			{!isWaiting && (payload?.type === 'WAITING' || payload?.type === '임시타입') && (
				<MoodCheckinPick onChangePickMood={onChangePickMood} onSendPickMood={onSendPickMood} moodNum={moodNum} />
			)}
			{!isWaiting && payload?.type === 'OPENED_AVERAGE' && (
				<MoodCheckinResult position={position} handleClose={handleClose} />
			)}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
