import React from 'react';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import './subcard.css';
const SubCards = ({ fetchedData }) => {
	return (
		<div className='subcard-ctn'>
			<img src={fetchedData.ImageUrl} width='60px' height='20px' />

			<span>
				<b>{fetchedData.DepartureTime}</b>
				{'  '}---------
				<FlightRoundedIcon />
				---------- {'  '}
				<b> {fetchedData.ArrivalTime}</b>
			</span>
			<span>
				<b>{fetchedData.flightCode}</b>
			</span>
		</div>
	);
};

export default SubCards;
