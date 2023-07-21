'use client';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useQueryMiniNetworking from '@/queries/queryFn/useQueryMiniNetworking';

export default function StartMiniNetworking() {
	const navigation = useNavigation();

	const room = navigation.path().split('/');

	const { data } = useQueryMiniNetworking(room[1], room[3]);

	return <StartTemplate data={data} activity={room[1]} roomName={room[3]} />;
}
