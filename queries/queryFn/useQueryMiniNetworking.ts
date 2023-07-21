import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQueryMiniNetworking = (activity: string, room: string) => {
	return useQuery(queryKeys.mininetworking(room), () => apiKeys.getMiniNetworking(room), {
		enabled: activity === 'mininetworking',
	});
};

export default useQueryMiniNetworking;
