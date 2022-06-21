import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ token }) => {
	console.log('login', token);

	return (
		// Show the element only when the user is logged in
		// Otherwise, redirect the user to /signin page
		token !== null ? <Outlet /> : <Navigate to='/login' />
	);
};

export default PrivateRoute;
