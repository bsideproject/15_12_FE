import { QuestionProps } from '@/components/screen/SpeedGame';
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
	getMoodCheckin: async (room: string) => {
		const response = await apiClient
			.get(`/activity/moodcheckin/${room}`)
			.then((res) => res.data)
			.catch((err) => err.response.data);

		return response;
	},
	createThankCircle: () => apiClient.post('/activity/thankcircle'),
	getThankCircle: async (room: string) => {
		const response = await apiClient
			.get(`/activity/thankcircle/${room}`)
			.then((res) => res.data)
			.catch((err) => err.response.data);

		return response;
	},
	createSpeedGame: (questions: QuestionProps[]) => apiClient.post('/activity/speedgame', { questions }),
	getSpeedGame: (room: string) => apiClient.get(`/activity/speedgame/${room}`),
};

export default apiKeys;
