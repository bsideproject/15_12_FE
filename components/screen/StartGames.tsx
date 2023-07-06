'use client';

import useNavigation from '@/hooks/useNavigation';
import useQueryMoodCheckin from '@/queries/queryFn/useQueryMoodCheckin';
import useQueryThankCircle from '@/queries/queryFn/useQueryThankCircle';

export default function ScreenStartGames() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data: moodChackin } = useQueryMoodCheckin(activity, room);
	const { data: thankCircle } = useQueryThankCircle(activity, room);

	console.log(moodChackin);

	return <div>테스트</div>;
}
