import { AUTH_LOGGED_IN, AUTH_LOG_OUT } from './actionTypes';
import { fetchUserProfile } from '../../api/user';
import { userLogin } from '../../api/auth';

export const loginAction = (
	username,
	password,
	callback = () => {},
) => dispatch => {
	userLogin(username, password)
		.then(({ id, fullname, role }) => {
			dispatch({
				type: AUTH_LOGGED_IN,
				payload: { profile: { id, username, fullname, role } },
			});

			callback();
		})
		.catch(e => callback(e.response.data));
};

export const fetchUserAction = (callback = () => {}) => dispatch => {
	fetchUserProfile()
		.then(({ id, fullname, username, role }) => {
			dispatch({
				type: AUTH_LOGGED_IN,
				payload: { profile: { id, fullname, username, role } },
			});

			callback();
		})
		.catch(callback);
};

export const authLogoutAction = () => dispatch => {
	dispatch({ type: AUTH_LOG_OUT });
};
