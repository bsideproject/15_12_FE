import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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
