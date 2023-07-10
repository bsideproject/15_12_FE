import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQueryThankCircle = (activity: string, room: string) => {
	return useQuery(queryKeys.thankCircle(room), () => apiKeys.getThankCircle(room), {
		enabled: activity === 'thank-circle',
		select: (data) => data.data,
	});
};

export default useQueryThankCircle;
