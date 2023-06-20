import apiClient from '@/core';

const apiKeys = {
	getActivities: () => apiClient.get('/activities'),
};

export default apiKeys;
