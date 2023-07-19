import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQuerySpeedGameGet = (activity: string, room: string) => {
	return useQuery(queryKeys.speedGame(room), () => apiKeys.getSpeedGame(room), {
		enabled: activity === 'speedgame',
		select: (data) => data.data,
	});
};

export default useQuerySpeedGameGet;
