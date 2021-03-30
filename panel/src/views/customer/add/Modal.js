import React from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';
import AddCustomer from '.';

const AddCustomerModal = ({ show, toggle }) => {
	return (
		<CModal show={show} onClose={toggle}>
			<CModalHeader closeButton>افزودن مشتری جدید</CModalHeader>
			<CModalBody>
				<AddCustomer toggle={toggle} />
			</CModalBody>
		</CModal>
	);
};

export default AddCustomerModal;
