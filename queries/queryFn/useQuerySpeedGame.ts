import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQuerySpeedGame = (activity: string, room: string) => {
	return useQuery(queryKeys.speedGame(room), () => apiKeys.getSpeedGame(room), {
		enabled: activity === 'speedGame',
	});
};

export default useQuerySpeedGame;
