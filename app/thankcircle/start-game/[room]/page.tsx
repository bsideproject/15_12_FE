import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import StartThankCircle from '@/components/screen/startGames/ThankCircle';
import apiKeys from '@/queries/apiKeys';
import queryKeys from '@/queries/queryKeys';

export default async function StartGame({ params: { room } }: { params: { room: string } }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(queryKeys.thankCircle(room), () => apiKeys.getThankCircle(room));
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<StartThankCircle />
		</Hydrate>
	);
}
