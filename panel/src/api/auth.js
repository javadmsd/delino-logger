import { api, setToken, removeToken } from './index';

export const userLogin = async (username, password) => {
	try {
		const response = await api.post('user/login', {
			username,
			password,
		});
		const res = response.data;
		setToken(res.token);

		return res;
	} catch (e) {
		throw e;
	}
};

export const userLogout = () => removeToken();
