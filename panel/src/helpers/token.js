import Storage from './storage';

// class token
class Token {
	constructor() {
		this._accessToken = null;
	}

	async get() {
		if (this._accessToken) {
			return Promise.resolve({
				accessToken: this._accessToken,
			});
		}

		const tokens = await Storage.getItem('token');
		if (!tokens) return null;

		this._accessToken = tokens;
		return Promise.resolve({ accessToken: this._accessToken });
	}

	async set(accessToken) {
		this._accessToken = accessToken;
		try {
			await Storage.setItem('token', accessToken);
			return true;
		} catch (e) {
			return false;
		}
	}

	clear() {
		this._accessToken = null;
		return Storage.removeItem('token');
	}
}

export default new Token();
