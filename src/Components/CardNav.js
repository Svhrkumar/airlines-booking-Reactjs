import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useNavigate } from 'react-router-dom';

export default function CardNav({ TabsHandle }) {
	const [value, setValue] = useState(2);
	const [flightDetails, setFlightDetails] = useState(false);
	const [passengerDetails, setPassengerDetails] = useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleTabs = () => {
		if (flightDetails == true) {
			setFlightDetails(false);
		} else {
			setFlightDetails(true);
		}
	};

	useEffect(() => {
		TabsHandle(flightDetails);
	}, [flightDetails]);
	const token = sessionStorage.getItem('token');
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label='disabled tabs example'>
				<Tab label='Flight Details' value='one' onClick={handleTabs} />

				<Tab label='Bagage Details' value='two' onClick={handleTabs} />
			</Tabs>
		</React.Fragment>
	);
}
