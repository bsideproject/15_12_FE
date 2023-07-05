import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQueryThankCircle = (room: string) => {
	return useQuery(queryKeys.thankCircle(room), () => apiKeys.getThankCircle(room), {});
};

export default useQueryThankCircle;
