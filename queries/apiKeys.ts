import apiClient from '@/core';

const apiKeys = {
	getActivities: () => apiClient.get('/activities'),
	createMoodCheckin: () => apiClient.post('/activity/moodcheckin'),
	getMoodCheckin: () => apiClient.get('/activities'),
};

export default apiKeys;
