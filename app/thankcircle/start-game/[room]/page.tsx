import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import StartThankCircle from '@/components/screen/StartGame/ThankCircle';
import apiKeys from '@/queries/apiKeys';
import queryKeys from '@/queries/queryKeys';

export default async function StartGame({ params }: { params: any }) {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(queryKeys.thankCircle('room'), () => apiKeys.getThankCircle('room'));
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<StartThankCircle rooma={params} />
		</Hydrate>
	);
}
