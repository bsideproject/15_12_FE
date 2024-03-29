import { useQuery } from '@tanstack/react-query';

import apiKeys from '../apiKeys';
import queryKeys from '../queryKeys';

const useQueryMoodCheckin = (activity: string, room: string) => {
	return useQuery(queryKeys.moodCheckin(room), () => apiKeys.getMoodCheckin(room), {
		enabled: activity === 'moodcheckin',
	});
};

export default useQueryMoodCheckin;
