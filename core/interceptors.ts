import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import getSession from '@/service/getUserInfo';

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
	const { session } = await getSession();
	console.log(session);

	return config;
};

const onErrorRequest = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	return response;
};

const onErrorResponse = (error: AxiosError): Promise<AxiosError> => {
	return Promise.reject(error);
};

export { onRequest, onErrorRequest, onResponse, onErrorResponse };
