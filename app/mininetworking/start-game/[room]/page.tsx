import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import StartMiniNetworking from '@/components/screen/StartGame/MiniNetworking';
import apiKeys from '@/queries/apiKeys';
import queryKeys from '@/queries/queryKeys';

export default async function StartGame({ params: { room } }: { params: { room: string } }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(queryKeys.mininetworking(room), () => apiKeys.getMiniNetworking(room));
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<StartMiniNetworking />
		</Hydrate>
	);
}
