import { apiAuth } from './index';

export const fetchAccountList = async (page, count) => {
	try {
		const response = await apiAuth.get(`accounts?page=${page}&count=${count}`);
		const res = response.data;

		return res;
	} catch (e) {
		throw e;
	}
};

export const addAccount = async values => {
	try {
		const response = await apiAuth.post('account/add', values);
		const res = response.data;

		return res;
	} catch (e) {
		throw e.response.data;
	}
};
