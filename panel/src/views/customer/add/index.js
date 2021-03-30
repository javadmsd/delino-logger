import React, { useState, useCallback } from 'react';
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CTextarea,
	CInput,
	CLabel,
	CInvalidFeedback,
} from '@coreui/react';
import { immediateToast } from 'izitoast-react';
import { addCustomer } from '@api/user';

const initialValues = {
	fullname: '',
	username: '',
	password: '',
	note: '',
};

const AddCustomer = ({ toggle }) => {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = useCallback(
		async e => {
			e.preventDefault();

			try {
				setSubmitting(true);

				await addCustomer(values);

				setValues(initialValues);
				setErrors(initialValues);

				immediateToast('success', {
					message: 'مشتری جدید اضافه شد',
				});

				setSubmitting(false);
				toggle(true);
			} catch (err) {
				setSubmitting(false);

				err._errors.forEach(errs => {
					if (typeof errs === 'string') {
						immediateToast('error', {
							message: errs,
						});
					} else {
						const errorAttrs = {};
						Object.keys(errs).forEach(attr => {
							errorAttrs[attr] = errs[attr][0];
						});
						setErrors(errorAttrs);
					}
				});
			}
		},
		[values],
	);

	const onChange = useCallback((e, key) => {
		const value = e.target.value;

		if (value === '') {
			setErrors(err => ({
				...err,
				[key]: value,
			}));
		}

		setValues(val => ({ ...val, [key]: value }));
	}, []);

	return (
		<CForm action='' method='post' className='form-horizontal was-validated'>
			<CFormGroup row>
				<CCol md='3'>
					<CLabel htmlFor='fullname'>نام مشتری</CLabel>
				</CCol>
				<CCol xs='12' md='9'>
					<CInput
						id='fullname'
						name='fullname'
						required
						onChange={e => onChange(e, 'fullname')}
						value={values.fullname}
					/>
					{errors.fullname && (
						<CInvalidFeedback className='help-block'>
							{errors.fullname}
						</CInvalidFeedback>
					)}
				</CCol>
			</CFormGroup>
			<CFormGroup row>
				<CCol md='3'>
					<CLabel htmlFor='username'>یوزر</CLabel>
				</CCol>
				<CCol xs='12' md='9'>
					<CInput
						id='username'
						name='username'
						required
						onChange={e => onChange(e, 'username')}
						value={values.username}
					/>
					{errors.username && (
						<CInvalidFeedback className='help-block'>
							{errors.username}
						</CInvalidFeedback>
					)}
				</CCol>
			</CFormGroup>
			<CFormGroup row>
				<CCol md='3'>
					<CLabel htmlFor='password'>پسورد</CLabel>
				</CCol>
				<CCol xs='12' md='9'>
					<CInput
						id='password'
						name='password'
						required
						onChange={e => onChange(e, 'password')}
						value={values.password}
					/>
					{errors.password && (
						<CInvalidFeedback className='help-block'>
							{errors.password}
						</CInvalidFeedback>
					)}
				</CCol>
			</CFormGroup>
			<CFormGroup row>
				<CCol md='3'>
					<CLabel htmlFor='note'>یادداشت</CLabel>
				</CCol>
				<CCol xs='12' md='9'>
					<CTextarea
						name='note'
						id='note'
						rows='6'
						onChange={e => onChange(e, 'note')}
						value={values.note}
					/>
					{errors.note && (
						<CInvalidFeedback className='help-block'>
							{errors.note}
						</CInvalidFeedback>
					)}
				</CCol>
			</CFormGroup>
			<CFormGroup row>
				<CCol xs='12' md='12'>
					<CButton
						color='success'
						block
						onClick={onSubmit}
						disabled={submitting}
					>
						افزودن مشتری
					</CButton>
				</CCol>
			</CFormGroup>
		</CForm>
	);
};

export default AddCustomer;
