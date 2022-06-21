import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './tabnav.css';

const Tabnav = () => {
	const userAuth = useSelector((state) => state.userAuth);
	const { user } = userAuth;
	return (
		<div>
			<ul className='tab-main-ctn'>
				<li className='tab-list'>
					<Link className='tab-link' to='/'>
						{' '}
						Book Tickets
					</Link>
				</li>
				<li className='tab-list'>
					<Link className='tab-link' to='/manageBookings'>
						Manage Booking
					</Link>
				</li>

				<li className='tab-list'>Booking History</li>
			</ul>
		</div>
	);
};

export default Tabnav;
