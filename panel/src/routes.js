import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard'));

const ErrorList = React.lazy(() => import('./views/error/list'));

const routes = [
	{ path: '/', exact: true, name: 'Dashboard', component: Dashboard },

	{ path: '/error/list', name: 'Error list', component: ErrorList },
];

export default routes;
