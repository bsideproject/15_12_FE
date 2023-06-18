import apiClient from '@/core';

const apiKeys = {
	getActivities: () => apiClient.get('https://api.bside1512.dev/activities'),
};

export default apiKeys;
