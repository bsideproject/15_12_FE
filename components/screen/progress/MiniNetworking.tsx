'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { usePayload, usePublish } from '@/atoms/socketAtoms';
import Close from '@/components/modules/Close';
import MiniNetworkingList from '@/components/modules/MiniNetworkingList';
import MiniNetworkingMatching from '@/components/modules/MiniNetworkingMatching';
import Wait from '@/components/modules/Wait';
import useNavigation from '@/hooks/useNavigation';
import localStorage from '@/service/localStorage';

export default function ProgressMiniNetworking() {
	const navigation = useNavigation();

	const publish = useRecoilValue(usePublish);
	const payload = useRecoilValue(usePayload);

	const [position, setPosition] = useState<string>('');
	const [isWaiting, setIsWaiting] = useState<boolean>(true);
	const [isMatching, setIsMatching] = useState<boolean>(false);
	const [groupNum, setGroupNum] = useState<number>(0);

	useEffect(() => {
		const userPosition = localStorage.get()!;
		setPosition(userPosition);
	}, []);

	const roomName = navigation.path().split('/')[2];

	useEffect(() => {
		if (payload?.type === 'OPENED_PARTICIPANT_LIST') {
			setIsWaiting(false);
		}
	}, [payload?.type === 'OPENED_PARTICIPANT_LIST']);

	const handleStep = () => {
		publish(`/app/mininetworking/${roomName}/start`);
	};

	const handleClose = () => {
		publish(`/app/mininetworking/${roomName}/close`);
	};

	const handleGroupMatching = () => {
		setIsMatching(true);
	};

	// 그룹 구성
	const onChangeGroupNum = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e) setGroupNum(Number(e.target.value.replace(/[^0-9]/g, '')));
	};

	return (
		<>
			{isWaiting && position === 'participant' && <Wait position={position} />}
			{isMatching && position === 'organizer' && (
				<MiniNetworkingMatching groupNum={groupNum} onChangeGroupNum={onChangeGroupNum} />
			)}
			{!isMatching && payload?.type === 'OPENED_PARTICIPANT_LIST' && (
				<MiniNetworkingList
					position={position}
					handleGroupMatching={handleGroupMatching}
					participantList={payload?.payload}
				/>
			)}
			{payload?.type === 'CLOSED_ROOM' && <Close />}
		</>
	);
}
