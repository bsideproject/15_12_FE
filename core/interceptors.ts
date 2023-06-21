import { Amplify } from 'aws-amplify';
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import apiClient from '@/core/index';
import getUserSession from '@/service/getUserSession';
import awsConfig from 'aws-exports';

Amplify.configure(awsConfig);

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
	const session = await getUserSession();

	config.headers.Authorization = session ? `Bearer ${session?.getAccessToken().getJwtToken()}` : null;

	return config;
};

const onErrorRequest = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	return response;
};

const onErrorResponse = async (error: AxiosError): Promise<AxiosError> => {
	if (error?.response?.status === 403) {
		const originalConfig = error.config!;

		try {
			const session = await getUserSession();

			if (session) {
				originalConfig.headers.Authorization = `Bearer ${session?.getAccessToken().getJwtToken()}`;
				await apiClient.request(originalConfig);
			} else {
				alert('로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.');
				window.location.href = '/login';
			}
		} catch (err) {
			throw err;
		}
		return Promise.reject(error);
	}
	return Promise.reject(error);
};

export { onRequest, onErrorRequest, onResponse, onErrorResponse };
