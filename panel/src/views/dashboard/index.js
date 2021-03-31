import React from 'react';
// import {
// 	CCard,
// 	CCardBody,
// 	CCardHeader,
// 	CCol,
// 	CProgress,
// 	CRow,
// } from '@coreui/react';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
	return <Redirect to='/error/list' />;
	// 	return (
	// 		<>
	// 			<CCard>
	// 				<CCardHeader>
	// 					<h3>3333</h3>
	// 				</CCardHeader>
	// 				<CCardBody className='fs-15'>
	// 					<CRow className='text-center mb-2'>
	// 						<CCol md sm='12' className='mb-sm-2 mb-0'>
	// 							<div className='text-muted mb-3'>123</div>
	// 							<div className='mb-1'>
	// 								<strong>234</strong>
	// 							</div>
	// 							<CProgress
	// 								className='progress-xs mt-2'
	// 								precision={1}
	// 								color='success'
	// 								value={456}
	// 							/>
	// 						</CCol>
	// 					</CRow>
	// 				</CCardBody>
	// 			</CCard>
	// 		</>
	// 	);
};

export default Dashboard;
