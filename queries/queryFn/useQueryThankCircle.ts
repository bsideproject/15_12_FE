import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQueryThankCircle = (activity: string, roomName: string) => {
	return useQuery(queryKeys.thankCircle(roomName), () => apiKeys.getThankCircle(roomName), {
		enabled: activity === 'thankcircle',
	});
};

export default useQueryThankCircle;
