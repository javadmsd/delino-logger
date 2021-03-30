import React from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';
import AddOrder from '.';

const AddOrderModal = ({ show, toggle }) => {
	return (
		<CModal show={show} onClose={toggle} size='xl'>
			<CModalHeader closeButton>ثبت سفارش جدید</CModalHeader>
			<CModalBody>
				<AddOrder toggle={toggle} />
			</CModalBody>
		</CModal>
	);
};

export default AddOrderModal;
