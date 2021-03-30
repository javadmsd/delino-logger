import { apiAuth } from './index';

export const fetchUserProfile = async () => {
	try {
		const response = await apiAuth.get('user/profile');
		const res = response.data;

		return res;
	} catch (e) {
		throw e;
	}
};

export const fetchUserSuggestion = async () => {
	try {
		const response = await apiAuth.get('user/suggestion');
		const res = response.data;

		return res;
	} catch (e) {
		throw e;
	}
};

export const addCustomer = async values => {
	try {
		const response = await apiAuth.post('customer/add', values);
		const res = response.data;

		return res;
	} catch (e) {
		throw e.response.data;
	}
};
