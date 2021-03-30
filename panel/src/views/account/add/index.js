import React, { useState, useCallback, useEffect } from 'react';
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CFormText,
	CInput,
	CLabel,
	CSelect,
	CInputGroup,
	CInputGroupAppend,
	CInvalidFeedback,
} from '@coreui/react';
import ReactTags from 'react-tag-autocomplete';
import { immediateToast } from 'izitoast-react';
import AddCustomerModal from 'views/customer/add/Modal';
import { fetchUserSuggestion } from '@api/user';
import { addAccount } from '@api/account';

const initialValues = {
	key: '',
	name: '',
	username: '',
	password: '',
	customers: [],
};

const AddAccount = ({ toggle }) => {
	const [customersSuggestion, setCustomersSuggestion] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);

	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(initialValues);
	const [submitting, setSubmitting] = useState(false);

	const getCustomerSuggestion = useCallback(async () => {
		try {
			const list = await fetchUserSuggestion();
			setCustomersSuggestion(list);
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		getCustomerSuggestion();
	}, []);

	const onDeleteCustomers = useCallback(
		i => {
			const tags = values.customers.slice(0);
			tags.splice(i, 1);
			setValues({ ...values, customers: tags });
		},
		[values],
	);

	const onAddCustomers = useCallback(
		tag => {
			const tags = [].concat(values.customers, tag);
			setValues({ ...values, customers: tags });
		},
		[values],
	);

	const onSubmit = useCallback(
		async e => {
			e.preventDefault();

			try {
				setSubmitting(true);

				await addAccount({
					...values,
					customers: values.customers.map(c => c.id),
				});

				setValues(initialValues);
				setErrors(initialValues);

				immediateToast('success', {
					message: 'اکانت جدید اضافه شد',
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

	const toggleAddModal = (update = false) => {
		if (update) getCustomerSuggestion();
		setShowAddModal(!showAddModal);
	};

	return (
		<>
			<CForm action='' method='post' className='form-horizontal was-validated'>
				<CFormGroup row>
					<CCol md='3'>
						<CLabel htmlFor='key'>شناسه اکانت</CLabel>
					</CCol>
					<CCol xs='12' md='9'>
						<CInput
							id='key'
							name='key'
							required
							onChange={e => onChange(e, 'key')}
							value={values.key}
						/>
						{errors.key ? (
							<CInvalidFeedback className='help-block'>
								{errors.fullname}
							</CInvalidFeedback>
						) : (
							<CFormText>در بعضی مواقع همان نام کاربری است</CFormText>
						)}
					</CCol>
				</CFormGroup>
				<CFormGroup row>
					<CCol md='3'>
						<CLabel htmlFor='key'>اکانت به نام</CLabel>
					</CCol>
					<CCol xs='12' md='9'>
						<CInput
							id='name'
							name='name'
							required
							onChange={e => onChange(e, 'name')}
							value={values.name}
						/>
						{errors.name && (
							<CInvalidFeedback className='help-block'>
								{errors.name}
							</CInvalidFeedback>
						)}
					</CCol>
				</CFormGroup>
				<CFormGroup row>
					<CCol md='3'>
						<CLabel htmlFor='broker'>کارگزاری</CLabel>
					</CCol>
					<CCol xs='12' md='9'>
						<CSelect
							custom
							name='select'
							id='broker'
							required
							onChange={e => onChange(e, 'broker')}
							value={values.broker}
						>
							<option value=''>انتخاب کنید</option>
							<option value='1'>Option #1</option>
							<option value='2'>Option #2</option>
							<option value='3'>Option #3</option>
						</CSelect>
						{errors.broker && (
							<CInvalidFeedback className='help-block'>
								{errors.broker}
							</CInvalidFeedback>
						)}
					</CCol>
				</CFormGroup>
				<CFormGroup row>
					<CCol md='3'>
						<CLabel htmlFor='software'>نرم‌افزار کارگزاری</CLabel>
					</CCol>
					<CCol xs='12' md='9'>
						<CSelect
							custom
							name='select'
							id='software'
							required
							onChange={e => onChange(e, 'software')}
							value={values.software}
						>
							<option value=''>انتخاب کنید</option>
							<option value='1'>Option #1</option>
							<option value='2'>Option #2</option>
							<option value='3'>Option #3</option>
						</CSelect>
						{errors.software && (
							<CInvalidFeedback className='help-block'>
								{errors.software}
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
						<CLabel htmlFor='customers'>مشتری‌ها</CLabel>
					</CCol>
					<CCol xs='12' md='9'>
						<CInputGroup>
							<ReactTags
								tags={values.customers}
								suggestions={customersSuggestion}
								onDelete={onDeleteCustomers}
								onAddition={onAddCustomers}
								placeholderText=''
								minQueryLength={0}
							/>
							<CInputGroupAppend>
								<CButton type='button' color='primary' onClick={toggleAddModal}>
									+
								</CButton>
							</CInputGroupAppend>
						</CInputGroup>
						{errors.customers && (
							<CInvalidFeedback className='help-block'>
								{errors.customers}
							</CInvalidFeedback>
						)}
					</CCol>
				</CFormGroup>
				<CFormGroup row>
					<CCol xs='12' md='12'>
						<CButton
							color='success'
							block
							disabled={submitting}
							onClick={onSubmit}
						>
							افزودن اکانت
						</CButton>
					</CCol>
				</CFormGroup>
			</CForm>

			<AddCustomerModal show={showAddModal} toggle={toggleAddModal} />
		</>
	);
};

export default AddAccount;
