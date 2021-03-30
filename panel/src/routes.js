import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard'));

const AccountList = React.lazy(() => import('./views/account/list'));
const AddAccount = React.lazy(() => import('./views/account/add'));

const routes = [
	{ path: '/', exact: true, name: 'Dashboard', component: Dashboard },

	{ path: '/account/list', name: 'Account list', component: AccountList },
	{ path: '/account/add', name: 'Account list', component: AddAccount },
];

export default routes;
