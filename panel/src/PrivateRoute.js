import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
	const isLoggedIn = useSelector(state => state.user.isLoggedIn);

	if (isLoggedIn) {
		return <Component {...props} />;
	}

	return <Redirect to='/login' />;
};

export default PrivateRoute;
