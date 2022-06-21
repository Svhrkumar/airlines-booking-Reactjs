import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminFlightCard from '../Components/AdminFlightCard';
import '../Components/cards.css';
import '../Components/accordian.css';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AdminDashboard = () => {
	const [fetchedData, setFetchedData] = useState();
	const [refresh, setRefresh] = useState(false);
	const [edit, setEdit] = useState(false);

	const [airportsList, setAirportsList] = useState([]);
	// const [airportNameOriginList, setAirportNameOriginList] = useState([]);
	// const [airportNameDestList, setAirportNameDestList] = useState([]);
	const [airlinesList, setAirlinesList] = useState([]);
	const flightData = useSelector((state) => state.flightData);

	const { isRefresh } = flightData;
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
		seats: 0,
		canceled: 0,
		bookedSeats: 0,
		block: false,
	});
	const [errors, setErrors] = useState({
		flightCarrerReq: false,
		OriginCityReq: false,
		flightCodeReq: false,
		OrigAirportNameReq: false,
		DestinationCityReq: false,
		DestAirportNameReq: false,
		DepartureDateReq: false,
		DepartureTimeReq: false,
		ArrivalDateReq: false,
		ArrivalTimeReq: false,
		ImageUrlReq: false,
		PriceReq: false,
		seatsReq: false,
	});
	const {
		flightCarrerReq,
		OriginCityReq,
		flightCodeReq,

		DestinationCityReq,

		DepartureDateReq,
		DepartureTimeReq,
		ArrivalDateReq,
		ArrivalTimeReq,
		ImageUrlReq,
		PriceReq,
		seatsReq,
	} = errors;
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
		seats,
	} = flightDetails;
	console.log('check airlines', ImageUrl);

	const addHandler = async (e) => {
		e.preventDefault();
		setRefresh(false);
		setErrors({
			flightCarrerReq: false,
			OriginCityReq: false,
			flightCodeReq: false,
			OrigAirportNameReq: false,
			DestinationCityReq: false,
			DestAirportNameReq: false,
			DepartureDateReq: false,
			DepartureTimeReq: false,
			ArrivalDateReq: false,
			ArrivalTimeReq: false,
			ImageUrlReq: false,
			PriceReq: false,
			seatsReq: false,
		});
		if (
			flightCarrer !== '' &&
			OriginCity !== '' &&
			flightCode !== '' &&
			OrigAirportName !== '' &&
			DestinationCity !== '' &&
			DestAirportName !== '' &&
			DepartureDate !== '' &&
			DepartureTime !== '' &&
			ArrivalDate !== '' &&
			ArrivalTime !== '' &&
			ImageUrl !== '' &&
			Price !== '' &&
			seats !== ''
		) {
			await axios
				.post(
					'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/schedule',
					flightDetails
				)
				.then((res) => {
					console.log(res);
					setRefresh(true);
					handleDetailsTab();
					toast.success('Added New Flight Successfully in Schedule', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
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
						seats: 0,
						canceled: 0,
						bookedSeats: 0,
						block: false,
					});
				})
				.catch((err) => {
					console.log(err);
				});
			setErrors({
				flightCarrerReq: false,
				OriginCityReq: false,
				flightCodeReq: false,
				OrigAirportNameReq: false,
				DestinationCityReq: false,
				DestAirportNameReq: false,
				DepartureDateReq: false,
				DepartureTimeReq: false,
				ArrivalDateReq: false,
				ArrivalTimeReq: false,
				ImageUrlReq: false,
				PriceReq: false,
				seatsReq: false,
			});
		} else {
			if (
				flightCarrer === '' &&
				OriginCity === '' &&
				flightCode === '' &&
				OrigAirportName === '' &&
				DestinationCity === '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: true,
					OriginCityReq: true,
					flightCodeReq: true,
					OrigAirportNameReq: true,
					DestinationCityReq: true,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity === '' &&
				flightCode === '' &&
				OrigAirportName === '' &&
				DestinationCity === '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: true,
					flightCodeReq: true,
					OrigAirportNameReq: true,
					DestinationCityReq: true,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode === '' &&
				OrigAirportName === '' &&
				DestinationCity === '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: true,
					OrigAirportNameReq: true,
					DestinationCityReq: true,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName === '' &&
				DestinationCity === '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: true,
					DestinationCityReq: true,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity === '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: true,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity === '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: true,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName === '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: true,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate === '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: true,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime === '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: true,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime !== '' &&
				ArrivalDate === '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: false,
					ArrivalDateReq: true,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime !== '' &&
				ArrivalDate !== '' &&
				ArrivalTime === '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: false,
					ArrivalDateReq: false,
					ArrivalTimeReq: true,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime !== '' &&
				ArrivalDate !== '' &&
				ArrivalTime !== '' &&
				ImageUrl === '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: false,
					ArrivalDateReq: false,
					ArrivalTimeReq: false,
					ImageUrlReq: true,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime !== '' &&
				ArrivalDate !== '' &&
				ArrivalTime !== '' &&
				ImageUrl !== '' &&
				Price === '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: false,
					ArrivalDateReq: false,
					ArrivalTimeReq: false,
					ImageUrlReq: false,
					PriceReq: true,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime !== '' &&
				ArrivalDate !== '' &&
				ArrivalTime !== '' &&
				ImageUrl !== '' &&
				Price !== '' &&
				seats === ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: false,
					ArrivalDateReq: false,
					ArrivalTimeReq: false,
					ImageUrlReq: false,
					PriceReq: false,
					seatsReq: true,
				});
			}
			if (
				flightCarrer !== '' &&
				OriginCity !== '' &&
				flightCode !== '' &&
				OrigAirportName !== '' &&
				DestinationCity !== '' &&
				DestAirportName !== '' &&
				DepartureDate !== '' &&
				DepartureTime !== '' &&
				ArrivalDate !== '' &&
				ArrivalTime !== '' &&
				ImageUrl !== '' &&
				Price !== '' &&
				seats !== ''
			) {
				setErrors({
					flightCarrerReq: false,
					OriginCityReq: false,
					flightCodeReq: false,
					OrigAirportNameReq: false,
					DestinationCityReq: false,
					DestAirportNameReq: false,
					DepartureDateReq: false,
					DepartureTimeReq: false,
					ArrivalDateReq: false,
					ArrivalTimeReq: false,
					ImageUrlReq: false,
					PriceReq: false,
					seatsReq: false,
				});
			}
		}
	};

	console.log('------error----', errors);
	useEffect(() => {
		axios
			.get('https://airline-bookings-nodejs.herokuapp.com/api/v1/flights')
			.then((res) => {
				console.log(res);
				setFetchedData(res && res.data);
			})
			.catch((err) => {
				console.log(err);
			});
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

	const unBlockHandler = (action) => {
		setRefresh(false);
		const req = {
			_id: action._id,
			flightCarrer: action.flightCarrer,
			OriginCity: action.OriginCity,
			flightCode: action.flightCode,
			OrigAirportName: action.OrigAirportName,
			DestinationCity: action.DestinationCity,
			DestAirportName: action.DestAirportName,
			DepartureDate: action.DepartureDate,
			DepartureTime: action.DepartureTime,
			ArrivalDate: action.ArrivalDate,
			ArrivalTime: action.ArrivalTime,
			ImageUrl: action.ImageUrl,
			Price: action.Price,
			seats: action.seats,
			canceled: action.canceled,
			bookedSeats: action.bookedSeats,
			block: false,
		};
		axios
			.put(
				'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/schedule/update',
				req
			)
			.then((res) => {
				setFetchedData(res && res.data);
				toast.success('UnBooked Successfully', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log('block handler', res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const blockHandler = (action) => {
		setRefresh(false);

		const req = {
			_id: action._id,
			flightCarrer: action.flightCarrer,
			OriginCity: action.OriginCity,
			flightCode: action.flightCode,
			OrigAirportName: action.OrigAirportName,
			DestinationCity: action.DestinationCity,
			DestAirportName: action.DestAirportName,
			DepartureDate: action.DepartureDate,
			DepartureTime: action.DepartureTime,
			ArrivalDate: action.ArrivalDate,
			ArrivalTime: action.ArrivalTime,
			ImageUrl: action.ImageUrl,
			Price: action.Price,
			seats: action.seats,
			canceled: action.canceled,
			bookedSeats: action.bookedSeats,
			block: true,
		};
		axios
			.put(
				'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/schedule/update',
				req
			)
			.then((res) => {
				setFetchedData(res && res.data);
				toast.success('Blocked Successfully', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				console.log('block handler--------------', res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteHandler = (action) => {
		axios
			.delete(
				`https://airline-bookings-nodejs.herokuapp.com/api/v1/flight/schedule/${action._id}`
			)
			.then((res) => {
				console.log('delete res', res.data);
				toast.info('Canceled Flight', {
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
	};

	useEffect(() => {
		setRefresh(isRefresh);
	}, [isRefresh]);

	useEffect(() => {
		if (refresh === true) {
			setFetchedData([]);
			axios
				.get('https://airline-bookings-nodejs.herokuapp.com/api/v1/flights')
				.then((res) => {
					console.log(res);
					setFetchedData(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
			setRefresh(false);
		}
	}, [refresh]);

	useEffect(() => {
		console.log('airports', airportsList);
		if (OriginCity && DestinationCity) {
			const OriginAirportName =
				airportsList &&
				airportsList.find((obj) => obj.city_name === OriginCity);
			const DestinAirportName =
				airportsList &&
				airportsList.find((obj) => obj.city_name === DestinationCity);
			setFlightDetails({
				...flightDetails,
				OrigAirportName: OriginAirportName.airport_name,
				DestAirportName: DestinAirportName.airport_name,
			});
			console.log(
				'check airport',
				OriginAirportName.airport_name,
				DestinAirportName.airport_name
			);
		}
	}, [OriginCity, DestinationCity, airportsList, flightDetails]);

	const [viewDetails, setViewDetails] = useState(false);
	const handleDetailsTab = () => {
		if (viewDetails === false) {
			setViewDetails(true);
		} else {
			setViewDetails(false);
		}
	};

	useEffect(() => {
		if (edit === true) {
			setViewDetails(true);
		} else {
			setViewDetails(false);
		}
	}, [edit]);

	return (
		<div>
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
			/>
			<div
				className='accordian-ctn bg-light'
				style={{ display: 'flex', justifyContent: 'space-between' }}
				onClick={handleDetailsTab}>
				<h4> Add Flight</h4>

				<span>{viewDetails ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
			</div>

			{viewDetails && (
				<form
					className='bg-light pt-3 pb-3   '
					style={{
						paddingLeft: '3rem',
						paddingRight: '3rem',
						margin: '20px 40px',
					}}>
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
									defaultValue={edit && flightCarrer}
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
								{flightCarrerReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										Required Field
									</p>
								) : (
									''
								)}
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
								{flightCodeReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{OriginCityReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{DestinationCityReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{DepartureDateReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{DepartureTimeReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{ArrivalDateReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{ArrivalTimeReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{ImageUrlReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								{PriceReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
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
								<label className='form-label'>Seat Availabe </label>
								<span style={{ color: 'red' }}>*</span>

								<input
									className='form-control '
									type='text'
									placeholder='Enter Price'
									name='language'
									value={seats}
									onChange={(e) =>
										setFlightDetails({
											...flightDetails,
											seats: e.target.value,
										})
									}
								/>
								{seatsReq ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Required Field
									</p>
								) : (
									''
								)}
							</div>
						</div>
					</div>

					<div
						className=' mt-4'
						style={{ display: 'flex', flexDirection: 'row-reverse' }}>
						<button className='card-btn' onClick={addHandler}>
							ADD
						</button>
					</div>
				</form>
			)}

			<div className='mt-3' style={{ padding: '10px 30px' }}>
				<h4>Manage Flights</h4>
				<hr />

				{fetchedData &&
					fetchedData
						.reverse()
						.map((data, id) => (
							<AdminFlightCard
								fetchedData={data}
								unBlockHandler={unBlockHandler}
								blockHandler={blockHandler}
								deleteHandler={deleteHandler}
							/>
						))}
			</div>
		</div>
	);
};

export default AdminDashboard;
