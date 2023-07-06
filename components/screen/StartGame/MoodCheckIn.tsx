'use client';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useQueryMoodCheckin from '@/queries/queryFn/useQueryMoodCheckin';

export default function StartMoodCheckIn() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQueryMoodCheckin(activity, room);

	return <StartTemplate data={data} />;
}
