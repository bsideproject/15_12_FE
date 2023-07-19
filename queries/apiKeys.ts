import apiClient from '@/core';

const apiKeys = {
	getActivities: async () => {
		const response = await apiClient
			.get('/activities')
			.then((res) => res.data)
			.catch((err) => err.response.data);

		return response;
	},
	createMoodCheckin: () => apiClient.post('/activity/moodcheckin'),
	getMoodCheckin: (room: string) => apiClient.get(`/activity/moodcheckin/${room}`),
	createThankCircle: () => apiClient.post('/activity/thankcircle'),
	getThankCircle: async (room: string) => {
		const response = await apiClient
			.get(`/activity/thankcircle/${room}`)
			.then((res) => res.data)
			.catch((err) => err.response.data);

		return response;
	},
};

export default apiKeys;
