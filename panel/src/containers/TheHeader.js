import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	CHeader,
	CToggler,
	CHeaderBrand,
	CHeaderNav,
	CHeaderNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { setShowSidebar } from '@services/app/actions';

const TheHeader = () => {
	const dispatch = useDispatch();
	const sidebarShow = useSelector(state => state.sidebarShow);

	const toggleSidebar = () => {
		const val = [true, 'responsive'].includes(sidebarShow)
			? false
			: 'responsive';
		dispatch(setShowSidebar(val));
	};

	const toggleSidebarMobile = () => {
		const val = [false, 'responsive'].includes(sidebarShow)
			? true
			: 'responsive';
		dispatch(setShowSidebar(val));
	};

	return (
		<CHeader className='header-sticky'>
			<CToggler
				inHeader
				className='ml-md-3 d-lg-none'
				onClick={toggleSidebarMobile}
			/>
			<CToggler
				inHeader
				className='ml-3 d-md-down-none'
				onClick={toggleSidebar}
			/>

			<CHeaderBrand className='mx-auto d-lg-none' to='/'>
				<CIcon name='logo' height='48' alt='Logo' />
			</CHeaderBrand>

			<CHeaderNav className='d-md-down-none mr-auto ml-4'>
				<CHeaderNavItem className='px-3' />
			</CHeaderNav>
		</CHeader>
	);
};

export default TheHeader;
