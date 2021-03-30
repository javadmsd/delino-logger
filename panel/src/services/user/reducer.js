import { AUTH_LOGGED_IN, AUTH_LOG_OUT } from './actionTypes';

const initialState = {
	isLoggedIn: false,
	profile: {
		id: null,
		fullname: null,
		username: null,
		role: null,
	},
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH_LOGGED_IN:
			return {
				...state,
				profile: payload.profile,
				isLoggedIn: true,
			};
		case AUTH_LOG_OUT:
			return initialState;
		default:
			return state;
	}
};
