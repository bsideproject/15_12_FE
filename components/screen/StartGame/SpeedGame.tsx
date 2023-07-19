'use client';

import { useEffect } from 'react';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useSocketHyo from '@/hooks/useSocketHyo';
import useQuerySpeedGameGet from '@/queries/queryFn/useQuerySpeedGameGet';
import getUserSession from '@/service/getUserSession';

export default function StartSpeedGame() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQuerySpeedGameGet(activity, room);

	const { connect, payload } = useSocketHyo(`/topic/speedgame/${data?.room_name}/user-count`);

	const userToken = async () => {
		const session = await getUserSession();
		connect({ Authorization: `${session?.getAccessToken().getJwtToken()}` });
	};

	useEffect(() => {
		userToken();
	}, [data]);

	return <StartTemplate data={data} activity={activity} roomName={room} payload={payload} />;
}
