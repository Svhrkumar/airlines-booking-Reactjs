import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { USERLOGIN_SUCCESS } from '../Redux/types';
import './nav.css';

const NavbarComp = () => {
	const userAuth = useSelector((state) => state.userAuth);
	const { user } = userAuth;
	// console.log(userAuth);
	const token = sessionStorage.getItem('token');
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => {
		sessionStorage.removeItem('token');
		// dispatch(logoutHandler());
		navigate('/login');
		dispatch({
			type: USERLOGIN_SUCCESS,
			payload: false,
		});
	};
	return (
		<nav class='navbar navbar-expand-lg nav-bar '>
			<div class='container-fluid '>
				<div>
					<a class='navbar-brand ' href='#'>
						BookMyTrip
					</a>
				</div>
				<div
					class='collapse navbar-collapse nav-contrls'
					id='navbarNavDropdown'>
					<ul class='navbar-nav'>
						{token !== null ? (
							<React.Fragment>
								<li class='nav-item'>
									<a
										className='navbar-nav'
										style={{
											color: 'white',
											textDecoration: 'none',
											cursor: 'pointer',
										}}
										onClick={handleLogout}>
										Logout
									</a>
								</li>
							</React.Fragment>
						) : (
							<li class='nav-item'>
								<Link
									style={{ color: 'white', textDecoration: 'none' }}
									to='/login'>
									Login
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavbarComp;
