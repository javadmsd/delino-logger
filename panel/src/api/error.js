import { apiAuth } from './index';

export const fetchErrorList = async () => {
	try {
		const response = await apiAuth.get(`error`);
		const res = response.data;

		return res;
	} catch (e) {
		throw e;
	}
};

export const fetchErrorInfo = async id => {
	try {
		const response = await apiAuth.get(`error/${id}`);
		const res = response.data;

		return res;
	} catch (e) {
		throw e;
	}
};
