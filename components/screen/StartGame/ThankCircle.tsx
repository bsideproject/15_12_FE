'use client';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useQueryThankCircle from '@/queries/queryFn/useQueryThankCircle';

export default function StartThankCircle() {
	const navigation = useNavigation();

	const activity = navigation.path().split('/')[1];
	const room = navigation.params('room')!;

	const { data } = useQueryThankCircle(activity, room);

	return <StartTemplate data={data} />;
}
