import './App.css';
import Home from './Pages/Home';
import NavbarComp from './Components/Navbar';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManageBooking from './Pages/ManageBooking';
import Login from './Pages/Login';

import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from './Pages/AdminDashboard';
import Subnav from '../src/Components/Subnav';
import { getFlightslist } from './Redux/actions/apiActions';

function App() {
	const userAuth = useSelector((state) => state.userAuth);
	const dispatch = useDispatch();
	console.log('login', userAuth);
	const token = sessionStorage.getItem('token');

	const flightData = useSelector((state) => state.flightData);
	console.log('----flights----', flightData);
	useEffect(() => {
		dispatch(getFlightslist());
	}, [dispatch]);
	return (
		<div className='App'>
			<BrowserRouter>
				<NavbarComp />
				<center>
					<Subnav />
				</center>

				<Routes>
					<Route path='/adminpage' element={<AdminDashboard />} />

					<Route exact path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />

					<Route path='/manageBookings' element={<ManageBooking />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
