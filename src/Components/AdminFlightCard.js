import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import './cards.css';
import './accordian.css';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';
// import Table from './Table';
// import { useDispatch } from 'react-redux';
const Table = React.lazy(() => import('./Table'));
const AdminFlightCard = ({
	fetchedData,
	unBlockHandler,
	blockHandler,
	deleteHandler,
}) => {
	// const [updateId, setUpdateId] = useState();
	const [viewDetails, setViewDetails] = useState(false);
	// const [totalSeatCount, setTotalSeatCount] = useState(0);
	const [passengerList, setPassengerList] = useState([]);
	const [dataList, setDataList] = useState([]);
	const [flightDetails, setFlightDetails] = useState({
		flightCarrer: '',
		OriginCity: '',
		flightCode: '',
		OrigAirportName: '',
		DestinationCity: '',
		DestAirportName: '',
		DepartureDate: '',
		DepartureTime: '',
		ArrivalDate: '',
		ArrivalTime: '',
		ImageUrl: '',
		Price: '',
		block: false,
	});
	// const dispatch = useDispatch();
	// useEffect(() => {

	//  },[fetchedData._id])
	useEffect(() => {
		// dispatch({
		//   type: SELECTED_FLIGHT_SUCCESS,
		//   payload:fetchedData
		// })
		setPassengerList([]);

		axios
			.get(
				`https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/getBookings/${fetchedData._id}`
			)
			.then((res) => {
				console.log('------------------res---------------', res);
				setDataList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [fetchedData._id]);

	const updateCancel = () => {
		setFlightDetails({
			flightCarrer: '',
			OriginCity: '',
			flightCode: '',
			OrigAirportName: '',
			DestinationCity: '',
			DestAirportName: '',
			DepartureDate: '',
			DepartureTime: '',
			ArrivalDate: '',
			ArrivalTime: '',
			ImageUrl: '',
			Price: '',
			block: false,
		});

		// setUpdateId('');
	};

	const handleCard = () => {
		if (viewDetails === false) {
			setViewDetails(true);
		} else {
			setViewDetails(false);
		}
	};
	// const { seats, bookedSeats } = fetchedData;

	// useEffect(() => {
	// 	setTotalSeatCount(135 - (seats + bookedSeats));
	// }, [fetchedData]);

	// useEffect(
	//   () => {
	//     const req = {
	//       canceled: totalSeatCount
	//     }
	//   axios.patch(`http://localhost:8000/flights?id=${fetchedData.id}`,req)
	//   },[totalSeatCount]
	// )

	useEffect(() => {
		const listData =
			dataList &&
			dataList.filter((ele) => ele.flightCode === fetchedData.flightCode);

		const passList = listData.map((data) => data.bookedPassengers);
		const mergeArr = [].concat.apply([], passList);
		setPassengerList(mergeArr);
	}, [dataList, fetchedData]);

	console.log('-------------array------------', passengerList);

	return (
		<div>
			<div
				className='cards-ctn'
				style={{ backgroundColor: 'aliceblue', margin: '10px auto' }}>
				<img
					src={fetchedData.ImageUrl}
					width='60px'
					height='20px'
					alt={fetchedData.flightCarrer}
				/>
				<span>{fetchedData.flightCarrer}</span>
				<span style={{ width: '40%' }}>
					<b>
						{fetchedData.OriginCity}
						{'-'}
						{fetchedData.DepartureTime}{' '}
					</b>
					{'  '}-----{'  '}
					<b>
						{fetchedData.DestinationCity}
						{'-'} {fetchedData.ArrivalTime}
					</b>
				</span>
				<span>
					<b> {moment(fetchedData.DepartureDate).format('DD/MM/YYYY')}</b>
				</span>
				<span>
					<b>{fetchedData.flightCode}</b>
				</span>
				{fetchedData.block === true ? (
					<span>
						<button
							className='card-btn'
							onClick={() => unBlockHandler(fetchedData)}>
							UnBlock
						</button>
					</span>
				) : (
					<span>
						<button
							className='card-btn'
							onClick={() => blockHandler(fetchedData)}>
							Block
						</button>
					</span>
				)}
				<span>
					<Modal updateCancel={updateCancel} fetchedData={fetchedData} />
				</span>
				<span onClick={() => deleteHandler(fetchedData)}>
					<DeleteIcon />
				</span>
				<span className='card-details-btn' onClick={handleCard}>
					View Details
				</span>
			</div>
			{viewDetails && (
				<>
					<div className='accordian-card'>
						<div className='accordian-card-innr-ctn'>
							<div className='accordian-card'>
								<div
									className='accordian-card-innr-ctn'
									style={{ display: 'flex', justifyContent: 'space-around' }}>
									<div className='accordian-innr-sub-card'>
										<center>
											<p style={{ color: 'green' }}>Booked Seats</p>
											<span style={{ fontSize: '40px', color: 'green' }}>
												<b>{passengerList.length}</b>
											</span>
										</center>
									</div>
									{/* <div className="accordian-innr-sub-card"><center>
                <p style={{color:"green"}}>Canceled Tickets</p>
                <span style={{fontSize:"40px",color:"green"}}><b>{ fetchedData.canceled}</b></span>
      </center></div>*/}
									<div className='accordian-innr-sub-card'>
										<center>
											<p style={{ color: 'green' }}>Available Seats</p>
											<span style={{ fontSize: '40px', color: 'green' }}>
												<b>{123 - passengerList.length}</b>
											</span>
										</center>
									</div>
								</div>
							</div>

							<h5>Passengers List</h5>
							<hr />
							<Suspense fallback={<div>Loading....</div>}>
								<Table passengerList={passengerList} />
							</Suspense>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default React.memo(AdminFlightCard);
