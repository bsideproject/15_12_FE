'use client';

import useNavigation from '@/hooks/useNavigation';

export default function ScreenStartGames() {
	const navigation = useNavigation();

	console.log(navigation.path().split('/')[1]);
	console.log(navigation.params('room'));

	const activity = navigation.path().split('/')[1];

	return <div>gs</div>;
}
