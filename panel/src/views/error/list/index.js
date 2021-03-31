import React, { useEffect, useState, useCallback } from 'react';
import {
	CCard,
	CCardBody,
	CCardHeader,
	CCol,
	CDataTable,
	CRow,
	CPagination,
} from '@coreui/react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { fetchErrorList, fetchErrorInfo } from 'api/error';

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
	const [info, setInfo] = useState(null);
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

				// if (result.count !== dataCount)
				setDataCount(result.length);
			} catch (e) {
				setData([]);
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
			setInfo(result);
		} catch (e) {
			console.log(e);
		}
	}, []);

	const sourceError = () => {
		return info.sourceLines.join('\n');
	};

	return (
		<>
			<CRow>
				<CCol xs='12' lg='5'>
					<CCard>
						<CCardHeader>لیست خطاها</CCardHeader>
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

				<CCol xs='12' lg='7'>
					<CCard>
						<CCardHeader>جزییات خطای مورد نظر</CCardHeader>
						<CCardBody style={{ direction: 'ltr', textAlign: 'left' }}>
							{info ? (
								<>
									<CRow>
										<CCol xs='12' md='2' style={{ color: '#bbb' }}>
											Message
										</CCol>
										<CCol xs='12' md='10'>
											{info.message}
										</CCol>
									</CRow>
									<CRow>
										<CCol xs='12' md='2' style={{ color: '#bbb' }}>
											Stack
										</CCol>
										<CCol xs='12' md='10' style={{ whiteSpace: 'pre-wrap' }}>
											{info.stack}
										</CCol>
									</CRow>
									<CRow style={{ marginTop: 50 }}>
										<CCol xs='12' md='2' style={{ color: '#bbb' }}>
											Source file
										</CCol>
										<CCol xs='12' md='10'>
											{info.sourceFile}
										</CCol>
									</CRow>
									<CRow style={{ marginTop: 30 }}>
										<CCol xs='12' md='2' style={{ color: '#bbb' }}>
											Source
										</CCol>
										<CCol xs='12' md='10'>
											{info.sourceLines && (
												<SyntaxHighlighter
													language='javascript'
													style={docco}
													wrapLines
													showLineNumbers
													startingLineNumber={info.startLine}
													lineProps={lineNumber => {
														const style = {};
														if (lineNumber === info.errorLine) {
															style.backgroundColor = '#ffd3dc';
														}
														return { style };
													}}
												>
													{sourceError()}
												</SyntaxHighlighter>
											)}
										</CCol>
									</CRow>
								</>
							) : (
								<p style={{ textAlign: 'center' }}>
									بر روی یکی از خطاهای سمت راست کلیک کنید
								</p>
							)}
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	);
};

export default ErrorList;
