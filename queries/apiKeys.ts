import apiClient from '@/core';

const apiKeys = {
	getActivities: () => apiClient.get('/activities'),
	createMoodCheckin: () => apiClient.post('/activity/moodcheckin'),
	getMoodCheckin: (room: string) => apiClient.get(`/activity/moodcheckin/${room}`),
};

export default apiKeys;
