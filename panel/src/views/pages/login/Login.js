import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { immediateToast } from 'izitoast-react';

import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CInput,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { loginAction } from '@services/user/actions';

const Login = ({ history }) => {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = useCallback(e => {
		e.preventDefault();

		dispatch(
			loginAction(username, password, err => {
				if (err) {
					immediateToast('error', {
						message: err._errors[0],
					});
				} else {
					history.replace('/');
				}
			}),
		);
	});

	return (
		<div className='c-app c-default-layout flex-row align-items-center'>
			<CContainer>
				<CRow className='justify-content-center'>
					<CCol md='8'>
						<CCardGroup>
							<CCard className='p-4'>
								<CCardBody>
									<CForm>
										<h1>ورود</h1>
										<p className='text-muted'>ورود به حساب کاربری</p>
										<CInputGroup className='mb-3'>
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name='cil-user' />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												type='text'
												placeholder='نام کاربری'
												autoComplete='نام کاربری'
												value={username}
												onChange={e => setUsername(e.target.value)}
											/>
										</CInputGroup>
										<CInputGroup className='mb-4'>
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name='cil-lock-locked' />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												type='password'
												placeholder='کلمه عبور'
												autoComplete='کلمه عبور'
												value={password}
												onChange={e => setPassword(e.target.value)}
											/>
										</CInputGroup>
										<CRow>
											<CCol xs='6'>
												<CButton
													color='primary'
													className='px-4'
													type='submit'
													onClick={onSubmit}
												>
													ورود
												</CButton>
											</CCol>
											{/* <CCol xs='6' className='text-right'>
												<CButton color='link' className='px-0'>
													Forgot password?
												</CButton>
											</CCol> */}
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
							<CCard
								className='text-white bg-primary py-5 d-md-down-none'
								style={{ width: '44%' }}
							>
								<CCardBody className='text-center'>
									<div>
										<h2>ورود به پنل</h2>
										<p>نام کاربری و کلمه عبور خود را وارد کنید</p>
										{/* <Link to='/register'>
											<CButton
												color='primary'
												className='mt-3'
												active
												tabIndex={-1}
											>
												Register Now!
											</CButton>
										</Link> */}
									</div>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
};

export default Login;
