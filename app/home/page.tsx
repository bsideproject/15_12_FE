import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import ScreenHome from '@/components/screen/Home';
import apiKeys from '@/queries/apiKeys';
import queryKeys from '@/queries/queryKeys';

export default async function Home() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(queryKeys.activities(), () => apiKeys.getActivities());
	const dehydratedState = dehydrate(queryClient);

	return (
		<Hydrate state={dehydratedState}>
			<ScreenHome />
		</Hydrate>
	);
}
