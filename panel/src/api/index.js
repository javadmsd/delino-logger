import axios from 'axios';

import { apiUrl } from 'config';
import tokenHelper from '../helpers/token';

export const requestConfig = {
	baseURL: apiUrl,
	json: true,
	timeout: 20000, // 20 sec
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'cache-control': 'no-cache',
	},
};

export const api = axios.create(requestConfig);
export const apiAuth = axios.create(requestConfig);

export const getToken = async () => {
	const token = await tokenHelper.get();
	if (token) {
		await setApiAuthHeader(token.accessToken);
		return true;
	}
	return false;
};

export const setToken = accessToken => {
	tokenHelper.set(accessToken);
	setApiAuthHeader(accessToken);
};

export const setApiAuthHeader = accessToken => {
	apiAuth.defaults.headers.common.Authorization = generateTokenStructure(
		accessToken,
	);
};

export const generateTokenStructure = token => {
	return `Bearer ${token}`;
	// return token;
};

api.interceptors.response.use(undefined, async error => {
	if (isNetworkError(error)) {
		return new Promise(resolve => {
			const originalRequest = error.config;
			setTimeout(() => {
				resolve(api(originalRequest));
			}, 1500);
		});
	}
	return Promise.reject(error);
});

apiAuth.interceptors.response.use(undefined, async error => {
	if (isNetworkError(error)) {
		return new Promise(resolve => {
			const originalRequest = error.config;
			setTimeout(() => {
				resolve(apiAuth(originalRequest));
			}, 1500);
		});
	}
	return Promise.reject(error);
});

export const isNetworkError = err => {
	return !!err.isAxiosError && !err.response;
};

export const removeToken = () => {
	tokenHelper.clear();
	delete apiAuth.defaults.headers.common.Authorization;
};
