import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import StartMoodCheckIn from '@/components/screen/startGames/MoodCheckIn';
import apiKeys from '@/queries/apiKeys';
import queryKeys from '@/queries/queryKeys';

export default async function StartGame({ params: { room } }: { params: { room: string } }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(queryKeys.moodCheckin(room), () => apiKeys.getMoodCheckin(room));
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<StartMoodCheckIn />
		</Hydrate>
	);
}
