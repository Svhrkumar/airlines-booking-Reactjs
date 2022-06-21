import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CANCEL_FLIGHTTICKET_DATA } from '../Redux/types';
import './cards.css';
const DetailsCard = ({ fetchedData, ticketCancel }) => {
	const [viewDetails, setViewDetails] = useState(false);
	const handleDetailsTab = () => {
		if (viewDetails === false) {
			setViewDetails(true);
		} else {
			setViewDetails(false);
		}
	};
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: CANCEL_FLIGHTTICKET_DATA, payload: fetchedData });
	}, []);
	return (
		<React.Fragment>
			<div className='cards-ctn' style={{ marginBottom: '10px ' }}>
				<img src={fetchedData.ImageUrl} width='50px' height='20px' />
				<span>
					<b>{fetchedData.DepartureTime}</b>
					{'  '}------- {'  '}
					<b> {fetchedData.ArrivalTime}</b>
				</span>
				<span>
					<b>{fetchedData.flightCode}</b>
				</span>{' '}
				<span className='card-content'>
					No of Passengers: <b>{fetchedData.passengerDetails.length}</b>
				</span>
				<span>
					<b>Total Price: ₹{fetchedData.ticketPrice}</b>
				</span>
				<span className='card-details-btn' onClick={handleDetailsTab}>
					View Details
				</span>
				<span>
					<button
						className='card-btn'
						onClick={() => ticketCancel(fetchedData)}>
						Cancel Ticket
					</button>
				</span>
			</div>
			{viewDetails && (
				<div className='card-sub-ctn'>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}>
						<div className='card-sub-ctn-row'>
							<span className='card-content'>
								<b>PNR No: {fetchedData.bookingId}</b>
							</span>
							<span className='card-content'>
								Status: <b style={{ color: 'green' }}>Booking Confirm</b>
							</span>
							<span className='card-content'>
								<b> Total Amount : ₹ {fetchedData.ticketPrice}</b>
							</span>
						</div>

						<div className='card-sub-ctn-row'>
							<span className='card-content'>
								City From: <b>{fetchedData.originCity}</b>
							</span>
							<span className='card-content'>
								City To: <b>{fetchedData.destinationCity}</b>
							</span>
							<span className='card-content'>
								Departure Time: <b>{fetchedData.DepartureTime}</b>
							</span>
							<span className='card-content'>
								{' '}
								Arrival Time: <b>{fetchedData.ArrivalTime}</b>
							</span>
						</div>
						<div className='card-sub-ctn-row' style={{ flexWrap: 'wrap' }}>
							<span className='card-content'>
								Flight No: <b>{fetchedData.flightNo}</b>
							</span>
							<span className='card-content'>
								Booked Date: <b>{fetchedData.bookingDate}</b>
							</span>
							<span className='card-content'>
								No of Passengers: <b>{fetchedData.passengerDetails.length}</b>
							</span>
						</div>
						<div className='card-sub-ctn-row' style={{ flexWrap: 'wrap' }}>
							<h5>Passengers Details</h5>
							<hr />
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Gender</th>
										<th>Age</th>
										<th>Seat No</th>
										<th>Ordered Meal</th>
									</tr>
								</thead>
								<tbody>
									{fetchedData &&
										fetchedData.passengerDetails &&
										fetchedData.passengerDetails.map((data, id) => (
											<tr>
												<td>{data.name}</td>
												<td>{data.gender}</td>
												<td>{data.age}</td>
												<td>{data.seatNo}</td>
												<td>{data.mealType}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default DetailsCard;
