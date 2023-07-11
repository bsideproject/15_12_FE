'use client';

import { useEffect } from 'react';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useTest from '@/hooks/useTest';
import useQueryThankCircle from '@/queries/queryFn/useQueryThankCircle';
import getUserSession from '@/service/getUserSession';

export default function StartThankCircle() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQueryThankCircle(activity, room);

	const { connect, disconnect, payload } = useTest(`/topic/thankcircle/${data?.room_name}/user-count`);

	const userToken = async () => {
		const session = await getUserSession();
		connect({ Autorization: `${session?.getAccessToken().getJwtToken()}` });
	};

	useEffect(() => {
		userToken();
		return () => disconnect();
	}, [data]);

	console.log(payload);

	return <StartTemplate data={data} activity={activity} room={room} />;
}
