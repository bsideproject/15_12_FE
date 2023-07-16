'use client';

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import userNickname from '@/atoms/userNickname';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import getUserSession from '@/service/getUserSession';
import MixingImg from 'public/images/mixing-img.svg';

export default function ThankMixing({ position }: { position: string }) {
	const navigation = useNavigation();
	const nickname = useRecoilValue(userNickname);

	const roomName = navigation.path().split('/')[2];

	const { connect, payload } = useTest(`/topic/thankcircle/${roomName}/user-count`);

	const userToken = async () => {
		const session = await getUserSession();
		connect(position === 'organizer' ? { Authorization: `${session?.getAccessToken().getJwtToken()}` } : {}, nickname);
	};

	useEffect(() => {
		userToken();
	}, [roomName]);

	return (
		<div className="flex justify-center items-center h-real-screen">
			<div>
				<MixingImg className="mb-[6.94%] mx-auto" />
				<h2 className="text-h3 text-gray090 text-center">
					순서를
					<br />
					섞고 있어요.
				</h2>
				<p className="text-p2 text-gray070 text-center">참여자 명</p>
			</div>
		</div>
	);
}
