import React from 'react';
import { CModal, CModalHeader, CModalBody } from '@coreui/react';
import AddAccount from '.';

const AddAccountModal = ({ show, toggle }) => {
	return (
		<CModal show={show} onClose={toggle} closeOnBackdrop={false}>
			<CModalHeader closeButton>افزودن اکانت جدید</CModalHeader>
			<CModalBody>
				<AddAccount toggle={toggle} />
			</CModalBody>
		</CModal>
	);
};

export default AddAccountModal;
