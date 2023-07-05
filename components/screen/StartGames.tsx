'use client';

import useNavigation from '@/hooks/useNavigation';
import useQueryMoodCheckin from '@/queries/queryFn/useQueryMoodCheckin';

export default function ScreenStartGames() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQueryMoodCheckin(activity, room);

	console.log(data);

	return <div>gs</div>;
}
