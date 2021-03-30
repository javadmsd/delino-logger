import React, { useEffect, useState, useCallback } from 'react';
import {
	CBadge,
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CDataTable,
	CRow,
	CPagination,
	CButton,
	CInputCheckbox,
} from '@coreui/react';
import { fetchAccountList } from '@api/account';
import AddOrderModal from 'views/order/add/Modal';
import { immediateToast } from 'izitoast-react';
import AddAccountModal from '../add/Modal';

const itemsPerPage = 20;

const fields = [
	{
		key: 'check',
		label: '#',
		filter: false,
		sorter: false,
		_style: { width: '30px' },
	},
	{ key: 'name', label: 'نام' },
	{ key: 'broker', label: 'کارگزاری' },
	{ key: 'username', label: 'یوزر' },
	{ key: 'password', label: 'پسورد' },
	{ key: 'customers', label: 'مشتری' },
];

const AccountList = () => {
	const [data, setData] = useState(null);
	const [selected, setSelected] = useState({});
	const [dataCount, setDataCount] = useState(0);
	const [page, setPage] = useState(1);
	const [showAddAccountModal, setShowAddAccountModal] = useState(false);
	const [showAddOrderModal, setShowAddOrderModal] = useState(false);

	const getList = useCallback(
		async activePage => {
			try {
				const result = await fetchAccountList(activePage, itemsPerPage);
				setData(result.data);

				const selectData = {};
				result.data.forEach(r => {
					selectData[r.id] = false;
				});
				setSelected(selectData);

				if (result.count !== dataCount) setDataCount(result.count);
			} catch (e) {
				setData([]);
				setSelected({});
			}
		},
		[dataCount, page],
	);

	useEffect(() => {
		getList(page);
	}, []);

	const toggleAddAccountModal = (update = false) => {
		if (update) getList(1);
		setShowAddAccountModal(!showAddAccountModal);
	};

	const toggleAddOrderModal = () => {
		if (!Object.values(selected).find(s => s === true)) {
			immediateToast('warning', {
				message: 'اکانتی انتخاب نشده است',
			});
		} else {
			setShowAddOrderModal(!showAddOrderModal);
		}
	};

	const onSelected = useCallback(id => {
		console.log(id);
		setSelected(d => ({ ...d, [id]: !d[id] }));
	}, []);

	return (
		<>
			<CRow>
				<CCol xs='12' lg='12'>
					<CCard>
						<CCardHeader>
							لیست اکانت‌ها{' '}
							<div className='card-header-actions'>
								<CButton
									className='ml-2 mr-2'
									size='sm'
									color='primary'
									onClick={toggleAddOrderModal}
								>
									ثبت سفارش
								</CButton>

								<CButton
									size='sm'
									color='info'
									variant='outline'
									onClick={toggleAddAccountModal}
								>
									افزودن اکانت جدید
								</CButton>
							</div>
						</CCardHeader>
						<CCardBody>
							<CDataTable
								items={data}
								fields={fields}
								columnFilter
								striped
								loading={data === null}
								hover
								sorter
								clickableRows
								onRowClick={row => onSelected(row.id)}
								scopedSlots={{
									check: row => (
										<td>
											<CInputCheckbox
												className='no-back-click'
												onChange={() => onSelected(row.id)}
												checked={selected[row.id]}
											/>
										</td>
									),
									customers: row => (
										<td>
											{row.customers.map(customer => (
												<CBadge
													className='ml-1 mr-1'
													color='primary'
													key={customer.id}
												>
													{customer.name}
												</CBadge>
											))}
										</td>
									),
								}}
							/>

							<div className='mt-2'>
								<CPagination
									activePage={page}
									pages={Math.ceil(dataCount / itemsPerPage)}
									onActivePageChange={i => {
										if (i > 0) {
											setPage(i);
											getList(i);
										}
									}}
								/>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>

			<AddAccountModal
				show={showAddAccountModal}
				toggle={toggleAddAccountModal}
			/>

			<AddOrderModal show={showAddOrderModal} toggle={toggleAddOrderModal} />
		</>
	);
};

export default AccountList;
