'use client';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useQueryThankCircle from '@/queries/queryFn/useQueryThankCircle';

export default function StartMiniNetworking() {
	const navigation = useNavigation();

	const room = navigation.path().split('/');

	// const { data } = useQueryThankCircle(room[1], room[3]);

	return <StartTemplate data={data} activity={room[1]} roomName={room[3]} />;
}
