'use client';

import { useEffect } from 'react';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import useQueryMoodCheckin from '@/queries/queryFn/useQueryMoodCheckin';
import getUserSession from '@/service/getUserSession';

export default function StartMoodCheckIn() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQueryMoodCheckin(activity, room);

	const { connect, disconnect, payload } = useTest(`/topic/moodcheckin/${room}/user-count`);

	const userToken = async () => {
		const session = await getUserSession();
		connect({ Autorization: `${session?.getAccessToken().getJwtToken()}` });
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [room]);

	console.log(payload);

	return <StartTemplate data={data} />;
}
