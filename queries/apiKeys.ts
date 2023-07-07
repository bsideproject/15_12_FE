import apiClient from '@/core';

const apiKeys = {
	getActivities: () => apiClient.get('/activities'),
	createMoodCheckin: () => apiClient.post('/activity/moodcheckin'),
	getMoodCheckin: (room: string) => apiClient.get(`/activity/moodcheckin/${room}`),
	createThankCircle: () => apiClient.post('/activity/thankcircle'),
	getThankCircle: (room: string) => apiClient.get(`/activity/thankcircle/${room}`),
};

export default apiKeys;
