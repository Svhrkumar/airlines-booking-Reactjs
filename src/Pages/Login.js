import React, { useState, useEffect, memo } from 'react';
import './login.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinHandler } from '../Redux/actions/loginAction';
const Login = () => {
	const [userName, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [signupForm, setSignupForm] = useState(false);
	const [signinForm, setSigninForm] = useState(true);
	const [signin, setSignIn] = useState(false);

	const dispatch = useDispatch();

	let navigate = useNavigate();
	// const { user } = userAuth;
	// console.log('login', user);

	const [register, setRegister] = useState({
		firstname: '',
		lastname: '',
		RegEmail: '',
		RegPassword: '',
		contact: '',
		country: '',
	});
	const { firstname, lastname, RegEmail, RegPassword, contact, country } =
		register;

	const handleSignin = async (e) => {
		e.preventDefault();
		const req = {
			email: userName,
			password: password,
		};

		dispatch(signinHandler(req));
	};

	const token = sessionStorage.getItem('token');

	const userToken = JSON.parse(token);
	useEffect(() => {
		if (userToken !== null) {
			navigate('/adminpage');
		}
	}, [userToken]);

	const handleSignup = async (e) => {
		e.preventDefault();
		// dispatch(signupHandler(register));
	};
	const handleSignUpForms = () => {
		if (!signupForm) {
			setSignupForm(true);
			setSigninForm(false);
		} else {
			setSignupForm(true);
		}
	};

	const handleSignInForms = () => {
		if (!signinForm) {
			setSigninForm(true);
			setSignupForm(false);
		} else {
			setSigninForm(true);
		}
	};

	const Sigin = () => {
		return (
			<div className='form-signup '>
				<form
					style={{
						height: '300px',
						marginTop: '5px',
						padding: '10px 20px',
						alignItems: 'center',
						zIndex: 1,
					}}>
					<center>
						<h5>Signin</h5>
					</center>

					<div className='form-row mt-4' style={{ width: '250px' }}>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='Username'
								value={userName}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className='col mt-3'>
							<input
								type='password'
								className='form-control input-field'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Password'
							/>
						</div>
						<div className='col mt-2 '>
							<center>
								<button className='submit-btn' onClick={handleSignin}>
									Signin
								</button>
							</center>
						</div>
					</div>
				</form>
			</div>
		);
	};

	const regOnchenge = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setRegister({ ...register, [name]: value });
	};
	console.log(register);
	const Signup = () => {
		return (
			<div className='form-signup'>
				<form
					style={{
						height: '400px',
						marginTop: '5px',
						padding: '10px 20px',
						alignItems: 'center',
					}}>
					<center>
						<h5>Signup</h5>
					</center>

					<div className='form-row mt-4' style={{ width: '250px' }}>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='firstname'
								value={firstname}
								onChange={regOnchenge}
								name='firstname'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='lastname'
								value={lastname}
								onChange={regOnchenge}
								name='lastname'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='E-mail'
								value={RegEmail}
								onChange={regOnchenge}
								name='RegEmail'
							/>
						</div>
						<div className='col mt-3'>
							<input
								type='password'
								className='form-control input-field'
								placeholder='Password'
								value={RegPassword}
								onChange={regOnchenge}
								name='RegPassword'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='contact'
								value={contact}
								onChange={regOnchenge}
								name='contact'
							/>
						</div>
						<div className='col  mt-3'>
							<input
								type='text'
								className='form-control input-field'
								placeholder='country'
								value={country}
								onChange={regOnchenge}
								name='country'
							/>
						</div>
						<div className='col mt-2 '>
							<center>
								<button className='submit-btn' onClick={handleSignup}>
									Signup
								</button>
							</center>
						</div>
					</div>
				</form>
			</div>
		);
	};

	return (
		<div className='container-fluid outer-conatiner '>
			<div className='inner-container  '>
				<div className='' style={{ padding: '0px 15px' }}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-evenly',
							margin: '0px 0px',
						}}></div>
					{Sigin()}
				</div>
			</div>
		</div>
	);
};

export default memo(Login);
