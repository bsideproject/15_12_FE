import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import getSession from '@/service/getUserInfo';
import user from '@/service/user';

// eslint-disable-next-line import/no-cycle
import apiClient from '.';

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
	const { session } = await getSession();

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
		const { session, attributes } = await getSession();
		const originalConfig = error.config!;

		if (session) {
			try {
				const refreshToken = session.getRefreshToken();

				await new Promise((resolve, reject) => {
					user(attributes.email).refreshSession(refreshToken, (err, result) => {
						if (err) {
							reject(err);
							return;
						}

						originalConfig.headers.Authorization = `Bearer ${result.getAccessToken().getJwtToken()}`;
					});
				});

				return await apiClient.request(originalConfig);
			} catch (err) {
				user(attributes.email).signOut();
				window.location.href = '/';
				alert('로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.');
			}
		}
		return Promise.reject(error);
	}
	return Promise.reject(error);
};

export { onRequest, onErrorRequest, onResponse, onErrorResponse };
