import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './cards.css';
import { UPDATE_STATE_REFRESH } from '../Redux/types';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid ',
	boxShadow: 24,
	p: 4,
};

const BasicModal = ({ updateCancel, fetchedData }) => {
	console.log('check modal', fetchedData);
	const [updateId, setUpdateId] = useState();
	const flightData = useSelector((state) => state.flightData);
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const [refresh, setRefresh] = useState(false);
	const [airlinesList, setAirlinesList] = useState([]);
	const [airportsList, setAirportsList] = useState([]);
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
	const {
		flightCarrer,
		OriginCity,
		flightCode,
		OrigAirportName,
		DestinationCity,
		DestAirportName,
		DepartureDate,
		DepartureTime,
		ArrivalDate,
		ArrivalTime,
		ImageUrl,
		Price,
		block,
	} = flightDetails;
	const { selectedFlight } = flightData;
	console.log('selected flight', selectedFlight);
	const updateHandler = () => {
		setFlightDetails({
			_id: fetchedData._id,
			flightCarrer: fetchedData.flightCarrer,
			OriginCity: fetchedData.OriginCity,
			flightCode: fetchedData.flightCode,
			OrigAirportName: fetchedData.OrigAirportName,
			DestinationCity: fetchedData.DestinationCity,
			DestAirportName: fetchedData.DestAirportName,
			DepartureDate: fetchedData.DepartureDate,
			DepartureTime: fetchedData.DepartureTime,
			ArrivalDate: fetchedData.ArrivalDate,
			ArrivalTime: fetchedData.ArrivalTime,
			ImageUrl: fetchedData.ImageUrl,
			Price: fetchedData.Price,
			block: false,
		});

		setUpdateId(fetchedData._id);
	};
	const handleClose = () => {
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
		dispatch({
			type: UPDATE_STATE_REFRESH,
			payload: false,
		});
		setUpdateId('');
		setOpen(false);
	};

	useEffect(() => {
		axios
			.get('https://airline-bookings-nodejs.herokuapp.com/api/v1/airports')
			.then((res) => {
				console.log(res);
				setAirportsList(res && res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get('https://airline-bookings-nodejs.herokuapp.com/api/v1/airlines')
			.then((res) => {
				console.log(res);
				setAirlinesList(res && res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	console.log('flight ------', flightDetails);
	const updateHandle = (e) => {
		dispatch({
			type: UPDATE_STATE_REFRESH,
			payload: false,
		});
		e.preventDefault();
		console.log(
			'flight ------update---handle----------------------------------------------'
		);
		axios
			.put(
				'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/schedule/update',
				flightDetails
			)
			.then((res) => {
				console.log(res);
				setRefresh(true);
				setOpen(false);
				toast.success('Updated Flight Successfully in Schedule', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setUpdateId('');
				dispatch({
					type: UPDATE_STATE_REFRESH,
					payload: true,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleOpen = () => {
		updateHandler();

		setOpen(true);
	};
	return (
		<div>
			<button className='card-btn' onClick={handleOpen}>
				Reschedule
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<form
						className='bg-light pt-3 pb-3   '
						style={{
							paddingLeft: '3rem',
							paddingRight: '3rem',
							margin: '20px 40px',
						}}>
						{' '}
						<h4 className='model-header'>Reschedule or Update</h4>
						<hr />
						<div className='mt-1'>
							<div
								className='form-row'
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
								}}>
								<div className=' col-md-5 mt-2'>
									<label className='form-label'>flight Carrer</label>
									<span style={{ color: 'red' }}>*</span>

									<select
										class='form-select'
										id='inputGroupSelect03'
										aria-label='Example select with button addon'
										value={flightCarrer}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												flightCarrer: e.target.value,
											})
										}>
										{' '}
										<option value=''>Select Airlines</option>
										{airlinesList.map((data, id) => (
											<option key={id} value={data.label}>
												{data.label}
											</option>
										))}
									</select>
								</div>
								<div className=' col-md-5 mt-2'>
									<label className='form-label'>flightCode</label>
									<span style={{ color: 'red' }}>*</span>
									<input
										className='form-control'
										type='text'
										placeholder='flight code'
										value={flightCode}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												flightCode: e.target.value,
											})
										}
									/>
								</div>
							</div>

							<div
								className='form-row mt-2'
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>City From</label>
									<span style={{ color: 'red' }}>*</span>

									<select
										class='form-select'
										id='inputGroupSelect03'
										aria-label='Example select with button addon'
										value={OriginCity}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												OriginCity: e.target.value,
											})
										}>
										<option selected>Select City</option>
										{airportsList.map((data, id) => (
											<option key={id} value={data.city_name}>
												{data.city_name}
											</option>
										))}
									</select>
								</div>

								<div className='col-md-5'>
									<label className='form-label'>City To</label>
									<span style={{ color: 'red' }}>*</span>

									<select
										class='form-select'
										id='inputGroupSelect03'
										aria-label='Example select with button addon'
										value={DestinationCity}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												DestinationCity: e.target.value,
											})
										}>
										<option selected>Select Airlines Logo</option>
										{airportsList.map((data, id) => (
											<option key={id} value={data.city_name}>
												{data.city_name}
											</option>
										))}
									</select>
								</div>
							</div>

							<div
								className='form-row mt-2'
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>DepartureDate</label>
									<span style={{ color: 'red' }}>*</span>
									<input
										className='form-control'
										type='date'
										placeholder='Enter DepartureDate'
										value={DepartureDate}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												DepartureDate: e.target.value,
											})
										}
									/>
								</div>
								<div className='col-md-5'>
									<label className='form-label'>DepartureTime</label>
									<span style={{ color: 'red' }}>*</span>
									<input
										className='form-control'
										type='text'
										placeholder='Enter DepartureTime'
										value={DepartureTime}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												DepartureTime: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div
								className='form-row mt-2 '
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>ArrivalDate</label>
									<span style={{ color: 'red' }}>*</span>
									<input
										className='form-control'
										type='date'
										placeholder='Enter ArrivalDate'
										value={ArrivalDate}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												ArrivalDate: e.target.value,
											})
										}
									/>
								</div>
								<div className='col-md-5'>
									<label className='form-label'>ArrivalTime</label>
									<span style={{ color: 'red' }}>*</span>
									<input
										className='form-control'
										type='text'
										placeholder='Enter ArrivalTime'
										value={ArrivalTime}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												ArrivalTime: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div
								className='form-row mt-2 '
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'space-between',
									flexFlow: 'row',
								}}>
								<div className='col-md-5'>
									<label className='form-label'>Airlines Brand </label>
									<span style={{ color: 'red' }}>*</span>
									<div class='input-group mb-3'>
										<select
											class='form-select'
											id='inputGroupSelect03'
											aria-label='Example select with button addon'
											value={ImageUrl}
											onChange={(e) =>
												setFlightDetails({
													...flightDetails,
													ImageUrl: e.target.value,
												})
											}>
											<option selected>Select Airlines Logo</option>
											{airlinesList.map((data, id) => (
												<option key={id} value={data.image}>
													{data.label}
												</option>
											))}
										</select>
									</div>
								</div>
								<div className='col-md-5'>
									<label className='form-label'>Price </label>
									<span style={{ color: 'red' }}>*</span>

									<input
										className='form-control '
										type='text'
										placeholder='Enter Price'
										name='language'
										value={Price}
										onChange={(e) =>
											setFlightDetails({
												...flightDetails,
												Price: e.target.value,
											})
										}
									/>
								</div>
							</div>
						</div>
						<div
							className=' mt-4'
							style={{ display: 'flex', flexDirection: 'row-reverse' }}>
							<button className='card-btn' onClick={handleClose}>
								Cancel
							</button>
							<button className='card-btn' onClick={updateHandle}>
								Update
							</button>
						</div>
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default BasicModal;
