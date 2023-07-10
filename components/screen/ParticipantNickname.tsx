'use client';

import React, { useEffect, useState } from 'react';

import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import localStorage from '@/service/localStorage';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';
import ElInput from '../elements/ElInput';
import FormField from '../modules/FormField';

export default function ScreenParticipantNickname() {
	const navigation = useNavigation();

	const [nickname, setNickname] = useState<string>('');

	const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	};

	const roomName = navigation.path().split('/');

	const { connect, disconnect, payload } = useTest(` /topic/moodcheckin/${roomName[2]}`);

	const connectHaner = () => {
		connect({}, nickname);
		localStorage.set('participant');

		switch (roomName[1]) {
			case 'mood-checkin':
				navigation.push(`${roomName[1]}/${roomName[2]}/pick`);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		return () => disconnect();
	}, []);

	return (
		<ElGrid between bottomSm>
			<div>
				<h2 className="text-h3 text-gray090 text-center mt-[3.85%] mb-[1.60%]">
					얼음땡에
					<br />
					오신 것을 환영합니다!
				</h2>
				<p className="text-p2 text-gray070 text-center mb-[7.69%]">이름을 입력해 누구인지 알려주세요!</p>
				<FormField tilte="닉네임" margin="mb-[7.69%]">
					<ElInput id="nickname" type="text" placeholder="입력해주세요" _onChange={handleNickname} />
				</FormField>
			</div>
			<ElButton type="button" _onClick={connectHaner}>
				입장하기
			</ElButton>
		</ElGrid>
	);
}
