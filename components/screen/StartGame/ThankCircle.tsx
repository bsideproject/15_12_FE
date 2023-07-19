'use client';

import { useEffect } from 'react';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useSocket from '@/hooks/useSocket';
import useQueryThankCircle from '@/queries/queryFn/useQueryThankCircle';
import getUserSession from '@/service/getUserSession';

export default function StartThankCircle() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQueryThankCircle(activity, room);

	const { connect, payload } = useSocket();

	const userToken = async () => {
		const session = await getUserSession();
		connect(`/topic/thankcircle/${data?.room_name}/user-count`, {
			Authorization: `${session?.getAccessToken().getJwtToken()}`,
		});
	};

	useEffect(() => {
		if (data) userToken();
	}, [data]);

	return <StartTemplate data={data} activity={activity} room={room} payload={payload} />;
}
