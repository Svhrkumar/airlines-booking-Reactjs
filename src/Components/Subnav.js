import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useNavigate } from 'react-router-dom';
import './tabnav.css';
export default function DisabledTabs() {
	const [value, setValue] = React.useState(2);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const token = sessionStorage.getItem('token');
	const navigate = useNavigate();
	return (
		<React.Fragment>
			{token !== null ? (
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='disabled tabs example'>
					<Tab
						label='Book Tickets'
						value='one'
						onClick={() => {
							navigate('/');
						}}
					/>

					<Tab
						label='Manage Bookings'
						value='two'
						onClick={() => {
							navigate('/manageBookings');
						}}
					/>
					<Tab
						label='Admin Dashboard'
						value='three'
						onClick={() => {
							navigate('/adminpage');
						}}
					/>
				</Tabs>
			) : (
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='disabled tabs example'>
					<Tab
						label='Book Tickets'
						value='one'
						onClick={() => {
							navigate('/');
						}}
					/>

					<Tab
						label='Manage Bookings'
						value='two'
						onClick={() => {
							navigate('/manageBookings');
						}}
					/>
				</Tabs>
			)}
		</React.Fragment>
	);
}
