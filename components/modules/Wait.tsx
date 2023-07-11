'use client';

import { useEffect } from 'react';

import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import clsxm from '@/service/mergeStyle';
import WaitImg from 'public/images/wait-img.svg';

import ElButton from '../elements/ElButton';
import ElGrid from '../elements/ElGrid';

interface WaitProps {
	position: string;
	handleStep?: (value: string) => void;
}

export default function Wait({ position, handleStep }: WaitProps) {
	const navigation = useNavigation();

	const roomName = navigation.path().split('/')[2];

	const { connect, disconnect, payload } = useTest(`/topic/thankcircle/${roomName}/user-count`);

	const userToken = async () => {
		const session = await getUserSession();
		connect(position === 'organizer' ? { Autorization: `${session?.getAccessToken().getJwtToken()}` } : {});
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [roomName]);

	const textClasses = clsxm('text-p2');

	return (
		<ElGrid between bottomSm>
			<div className="text-center">
				<WaitImg className="mt-[28.21%] mx-auto mb-[7.69%]" />
				<h3 className="text-h3 text-gray090">
					참여자를
					<br />
					기다리고 있어요.
				</h3>
				<p className={`${textClasses} text-gray070 mb-[20.51%]`}>참여자 명</p>
				{position === 'organizer' && <p className={`${textClasses} text-gray070`}>제출자 명</p>}
			</div>
			{position === 'organizer' && <ElButton type="button">다음</ElButton>}
		</ElGrid>
	);
}
