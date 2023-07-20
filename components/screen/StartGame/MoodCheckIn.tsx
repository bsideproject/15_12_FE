'use client';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useQueryMoodCheckin from '@/queries/queryFn/useQueryMoodCheckin';

export default function StartMoodCheckIn() {
	const navigation = useNavigation();

	const room = navigation.path().split('/');

	const { data } = useQueryMoodCheckin(room[1], room[3]);

	return <StartTemplate data={data} activity={room[1]} roomName={room[3]} />;
}
