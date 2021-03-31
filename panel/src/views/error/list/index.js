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
	CInputCheckbox,
} from '@coreui/react';
import { fetchErrorList, fetchErrorInfo } from 'api/error';

const itemsPerPage = 20;

const fields = [
	{
		key: 'id',
		label: 'id',
		filter: false,
		sorter: false,
		_style: { width: '30px' },
	},
	{ key: 'message', label: 'message' },
];

const ErrorList = () => {
	const [data, setData] = useState(null);
	const [selected, setSelected] = useState({});
	const [dataCount, setDataCount] = useState(0);
	const [page, setPage] = useState(1);

	const getList = useCallback(
		async activePage => {
			try {
				const result = await fetchErrorList(activePage, itemsPerPage);
				setData(result);

				const selectData = {};
				result.forEach(r => {
					selectData[r.id] = false;
				});
				setSelected(selectData);

				// if (result.count !== dataCount)
				setDataCount(result.length);
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

	const onSelected = useCallback(async id => {
		console.log(id);
		try {
			const result = await fetchErrorInfo(id);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
		setSelected(d => ({ ...d, [id]: !d[id] }));
	}, []);

	return (
		<>
			<CRow>
				<CCol xs='12' lg='12'>
					<CCard>
						<CCardHeader>لیست خطاها </CCardHeader>
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
		</>
	);
};

export default ErrorList;
