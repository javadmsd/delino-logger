import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

import { useDispatch } from 'react-redux';

import { getToken } from '@api';
import { fetchUserAction } from '@services/user/actions';
import PrivateRoute from './PrivateRoute';

const Spinner = (
	<div className='pt-3 text-center'>
		<div className='sk-spinner sk-spinner-pulse' />
	</div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	const checkUser = async () => {
		const hasToken = await getToken();

		if (hasToken) {
			dispatch(
				fetchUserAction(() => {
					setLoading(false);
				}),
			);
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkUser();
	}, []);

	return loading ? (
		<div className='pt-3 text-center'>
			<div className='sk-spinner sk-spinner-pulse' />
		</div>
	) : (
		<HashRouter>
			<React.Suspense fallback={Spinner}>
				<Switch>
					<Route
						exact
						path='/login'
						name='Login Page'
						render={props => <Login {...props} />}
					/>
					<Route
						exact
						path='/404'
						name='Page 404'
						render={props => <Page404 {...props} />}
					/>
					<Route
						exact
						path='/500'
						name='Page 500'
						render={props => <Page500 {...props} />}
					/>
					<Route
						path='/'
						name='Home'
						render={props => <PrivateRoute component={TheLayout} {...props} />}
					/>
				</Switch>
			</React.Suspense>
		</HashRouter>
	);
};

export default App;
