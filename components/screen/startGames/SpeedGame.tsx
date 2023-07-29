'use client';

import StartTemplate from '@/components/modules/StartTemplate';
import useNavigation from '@/hooks/useNavigation';
import useQuerySpeedGame from '@/queries/queryFn/useQuerySpeedGame';

export default function StartSpeedGame() {
	const navigation = useNavigation();

	const room = navigation.path().split('/');

	const { data } = useQuerySpeedGame(room[1], room[3]);

	return <StartTemplate data={data} activity={room[1]} roomName={room[3]} />;
}
