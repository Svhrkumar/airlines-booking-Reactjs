import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DetailsCard from '../Components/DetailsCard';
import FullWidthTabs from '../Components/Tabnav';
import Subnav from '../Components/Subnav';
import SearchIcon from '../image/1084888.png';
import Popup from '../Components/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { cancelTicketHandler } from '../Redux/actions/apiActions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManageBooking = () => {
	const [email, setEmail] = useState('');
	const [pnr, setPnr] = useState('');
	const [fetchedData, setFetchedData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [search, setSearch] = useState(false);
	const [flightId, setFlightId] = useState(0);
	const [passengersLength, setPassengersLength] = useState(0);
	const [errors, setErrors] = useState({
		requiredField: false,
	});
	const [selectedFlight, setSelectedFlight] = useState({});
	const flightData = useSelector((state) => state.flightData);
	const { flightsList } = flightData;
	const ticketsData = useSelector((state) => state.ticketsData);
	const { cancelingFlight } = ticketsData;
	const { requiredField } = errors;
	const dispatch = useDispatch();
	console.log('---------componentData-----', fetchedData);
	console.log('---------canceleing filght-----', cancelingFlight);
	console.log('----flights-managebooking---', flightsList);
	// const[data] = flightId[0]
	useEffect(() => {
		axios
			.get('https://airline-bookings-nodejs.herokuapp.com/api/v1/flights/')
			.then((res) => {
				console.log(res.data);
				setFetchedData(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const ticketCancel = (action) => {
		const { passengerDetails, flightId } = action;
		console.log('-----cancel------', action.flightId, passengerDetails);
		setFlightId(flightId);
		setPassengersLength(passengerDetails.length);

		axios
			.delete(
				`https://airline-bookings-nodejs.herokuapp.com/api/v1/booking/cancel/${action._id}`
			)
			.then((res) => {
				console.log('delete res', res.data);
				toast.info('Canceled Ticket', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setRefresh(true);
			})
			.catch((err) => console.log('error----', err));

		setFlightId(0);
	};

	const handleSearch = (e) => {
		setErrors({
			requiredField: false,
		});
		e.preventDefault();
		if (email == '' && pnr == '') {
			setErrors({
				requiredField: true,
			});
		} else {
			if (email !== '' && pnr === '') {
				const emailReq = {
					bookingId: '',
					bookingUserEmail: email,
				};
				axios
					.post(
						'https://airline-bookings-nodejs.herokuapp.com/api/v1/bookinghistory/flight',
						emailReq
					)
					.then((res) => {
						setFetchedData(res.data);
						setSearch(true);
					})
					.catch((err) => {
						console.log('error----', err);
					});
				setErrors({
					requiredField: false,
				});
			} else {
				const pnrReq = {
					bookingId: pnr,
					bookingUserEmail: '',
				};
				axios
					.post(
						'https://airline-bookings-nodejs.herokuapp.com/api/v1/bookinghistory/flight',
						pnrReq
					)
					.then((res) => {
						setFetchedData(res.data);
						setSearch(true);
					})
					.catch((err) => {
						console.log('error----', err);
					});
				setErrors({
					requiredField: false,
				});
			}
		}
	};
	useEffect(() => {
		if (pnr === '' || email === '') {
			setSearch(false);
		}
	}, [pnr, email]);

	console.log('set flightis passengers', flightId, passengersLength);

	useEffect(() => {
		if (filteredData) {
			const findFlight = filteredData.find((obj) => obj);

			console.log('------------+++-----', findFlight);
		}
	}, [filteredData]);

	console.log('------fitered flight ----', filteredData);

	useEffect(
		(e) => {
			console.log('canceling', refresh);
			if (refresh === true) {
				setFetchedData([]);
				// axios
				//   .get("http://localhost:8000/Bookings")
				//   .then((res) => {
				//     setFetchedData(res.data);
				//     setRefresh(false);
				//   })
				//   .catch((err) => {
				//     console.log("error----", err);
				//   });

				if (email !== '' && pnr === '') {
					const emailReq = {
						bookingId: '',
						bookingUserEmail: email,
					};
					axios
						.post(
							'https://airline-bookings-nodejs.herokuapp.com/api/v1/bookinghistory/flight',
							emailReq
						)
						.then((res) => {
							setFetchedData(res.data);
							setSearch(true);
							setRefresh(false);
						})
						.catch((err) => {
							console.log('error----', err);
						});
					setErrors({
						requiredField: false,
					});
				} else {
					const pnrReq = {
						bookingId: pnr,
						bookingUserEmail: '',
					};
					axios
						.post(
							'https://airline-bookings-nodejs.herokuapp.com/api/v1/bookinghistory/flight',
							pnrReq
						)
						.then((res) => {
							setFetchedData(res.data);
							setSearch(true);
							setRefresh(false);
						})
						.catch((err) => {
							console.log('error----', err);
						});
					setErrors({
						requiredField: false,
					});
				}
			}
		},
		[refresh]
	);

	useEffect(() => {
		if (cancelingFlight) {
			axios
				.get(`http://localhost:8000/flights`)
				.then((res) => {
					setFilteredData(res.data);
				})
				.catch((err) => {
					console.log('error----', err);
				});
		}
	}, [cancelingFlight]);

	return (
		<div className='container-fluid'>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>{' '}
			<form className='bg-light  mb-4 form-ctn'>
				<center>
					<p style={{ color: '#0039a6' }}>
						<b>Check your next destination</b>
					</p>
				</center>

				<div
					className='form-row'
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
					}}>
					<div className=' col-md-3 mt-2 mr-3 field-ctn'>
						<label className='form-label'>PNR Search</label>
						<span style={{ color: 'red' }}>*</span>
						<input
							className='form-control '
							type='text'
							placeholder='PNR'
							value={pnr}
							onChange={(e) => setPnr(e.target.value)}
						/>
					</div>
					<div className=' col-md-3 mt-2 mr-2 field-ctn'>
						<label className='form-label'>Email Search</label>
						<span style={{ color: 'red' }}>*</span>
						<input
							className='form-control'
							type='text'
							placeholder='Enter Email ?'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>
				<div className='mt-4'>
					<center>
						{requiredField ? (
							<p style={{ fontSize: '15px', margin: '10px', color: 'red' }}>
								Please Search with PNR or Email
							</p>
						) : (
							''
						)}
						<button className='btn-primary-clr' onClick={handleSearch}>
							Search
						</button>
					</center>
				</div>
			</form>
			<div className=' cards-outer-ctn'>
				{!search ? (
					<center>
						<img src={SearchIcon} width='150px' height={'140px'} />
					</center>
				) : (
					fetchedData &&
					fetchedData.map((data, id) => (
						<DetailsCard fetchedData={data} ticketCancel={ticketCancel} />
					))
				)}
			</div>
		</div>
	);
};

export default ManageBooking;
