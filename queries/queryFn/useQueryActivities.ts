import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQueryActivities = () => {
	return useQuery(queryKeys.activities(), () => apiKeys.getActivities(), {
		staleTime: Infinity,
		retry: false,
	});
};

export default useQueryActivities;
