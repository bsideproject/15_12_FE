import axios, { AxiosInstance } from 'axios';

import { onRequest, onErrorRequest, onResponse, onErrorResponse } from '@/core/interceptors';

const apiClient: AxiosInstance = axios.create({
	baseURL: '',
	headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(onRequest, onErrorRequest);

apiClient.interceptors.response.use(onResponse, onErrorResponse);

export default apiClient;
