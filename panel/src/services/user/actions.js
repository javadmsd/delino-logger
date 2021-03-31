import { userLogin } from 'api/auth';
import { AUTH_LOGGED_IN, AUTH_LOG_OUT } from './actionTypes';
// import { fetchUserProfile } from 'api/user';

export const loginAction = (
	username,
	password,
	callback = () => {},
) => dispatch => {
	// {id, fullname, role}
	userLogin(username, password)
		.then(() => {
			dispatch({
				type: AUTH_LOGGED_IN,
				payload: {
					profile: {
						id: 1,
						fullname: 'admin',
						username: 'admin',
						role: 'admin',
					},
				},
			});

			callback();
		})
		.catch(e => callback(e.response.data));
};

export const fetchUserAction = (callback = () => {}) => dispatch => {
	// fetchUserProfile()
	// 	.then(({ id, fullname, username, role }) => {
	dispatch({
		type: AUTH_LOGGED_IN,
		payload: {
			profile: { id: 1, fullname: 'admin', username: 'admin', role: 'admin' },
		},
	});

	callback();
	// })
	// .catch(callback);
};

export const authLogoutAction = () => dispatch => {
	dispatch({ type: AUTH_LOG_OUT });
};
