import React, { useState, memo, useEffect } from 'react';
import Cards from '../Components/Cards';
import './home.css';
import axios from 'axios';
import { USERLOGIN_SUCCESS } from '../Redux/types';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '../image/planesearch.svg';
import noFlightFound from '../image/attachment.png';
import bg from '../image/8489.jpg';
import { useFormik } from 'formik';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { getAiportList, getFlightslist } from '../Redux/actions/apiActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
const Home = () => {
	const [selectedTrip, setSelectedTrip] = useState('oneRoundTrip');
	const [oneRound, setOneRound] = useState(true);
	const [fetchedData, setFetchedData] = useState([]);
	const [fetchedDataTwo, setFetchedDataTwo] = useState([]);
	const [filteredData, setFilteredData] = useState();
	const [search, setSearch] = useState(false);
	const [sameInputs, setSameInputs] = useState(false);
	const [airportsList, setAirportsList] = useState([]);
	const [requiredDepart, setRequiredDepart] = useState(false);
	const [requiredGoing, setRequiredGoing] = useState(false);
	const [requiredDates, setRequiredDates] = useState(false);
	const [searchDetails, setSearchDetails] = useState({
		destinationFrom: '',
		destinationTo: '',
		startDate: '',
		returnDate: '',
	});

	const { destinationFrom, destinationTo, startDate, returnDate } =
		searchDetails;

	const dispatch = useDispatch();
	const flightData = useSelector((state) => state.flightData);
	const airportData = useSelector((state) => state.airportData);
	console.log('----flights----', flightData, airportData);

	console.log(
		'selectedTrip',
		selectedTrip,
		searchDetails,
		fetchedData,
		fetchedDataTwo
	);
	const searchHandler = async (e) => {
		e.preventDefault();
		setRequiredDepart(false);
		setRequiredGoing(false);
		setRequiredDates(false);
		setSameInputs(false);
		console.log(searchDetails);
		setSearch(true);
		if (
			destinationFrom === destinationTo &&
			((destinationFrom !== '' && destinationTo !== '' && startDate !== '') ||
				returnDate !== '')
		) {
			setSameInputs(true);
		} else {
			if (
				(destinationFrom !== '' && destinationTo !== '' && startDate !== '') ||
				returnDate !== ''
			) {
				const firstReq = {
					OriginCity: destinationFrom,
					DestinationCity: destinationTo,
					DepartureDate: moment(startDate).format('YYYY-MM-DD'),
				};
				const secondReq = {
					OriginCity: destinationTo,
					DestinationCity: destinationFrom,
					DepartureDate: moment(returnDate).format('YYYY-MM-DD'),
				};

				if (selectedTrip === 'twoRoundTrip') {
					console.log('calling............');
					await axios
						.post(
							'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight',
							firstReq
						)
						.then((res) => {
							console.log('res', res);
							setFetchedData(res.data);
							setSearchDetails({
								destinationFrom: '',
								destinationTo: '',
								startDate: '',
								returnDate: '',
							});
						})
						.catch((err) => console.log(err));

					await axios
						.post(
							'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight',
							secondReq
						)
						.then((res) => {
							console.log('res', res);
							setFetchedDataTwo(res.data);
						})
						.catch((err) => console.log(err));
				} else {
					await axios
						.post(
							'https://airline-bookings-nodejs.herokuapp.com/api/v1/flight',
							firstReq
						)
						.then((res) => {
							console.log('res', res);
							setFetchedData(res.data);
							setSearchDetails({
								destinationFrom: '',
								destinationTo: '',
								startDate: '',
								returnDate: '',
							});
						})
						.catch((err) => console.log(err));
				}
				setRequiredDepart(false);
				setRequiredGoing(false);
				setRequiredDates(false);
				setSameInputs(false);
			} else {
				if (destinationFrom == '' && destinationTo == '' && startDate == '') {
					setRequiredDepart(true);
					setRequiredGoing(true);
					setRequiredDates(true);
					setSameInputs(false);
				}
				if (destinationFrom !== '' && destinationTo == '' && startDate == '') {
					setRequiredDepart(false);
					setRequiredGoing(true);
					setRequiredDates(true);
					setSameInputs(false);
				}
				if (destinationFrom !== '' && destinationTo !== '' && startDate == '') {
					setRequiredDepart(false);
					setRequiredGoing(false);
					setRequiredDates(true);
					setSameInputs(false);
				}
			}
		}
	};

	// useEffect(() => {

	// }, [destinationFrom, destinationTo, startDate, returnDate]);
	console.log(sameInputs);
	useEffect(() => {
		const userData = sessionStorage.getItem('token');
		const user = JSON.parse(userData);
		dispatch({
			type: USERLOGIN_SUCCESS,
			payload: user,
		});
	}, []);

	useEffect(() => {
		dispatch(getFlightslist());

		axios
			.get('https://airline-bookings-nodejs.herokuapp.com/api/v1/airports')
			.then((res) => {
				console.log(res);
				setAirportsList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (selectedTrip === 'oneRoundTrip') {
			setSearchDetails({ ...searchDetails, returnDate: '' });
		}
	}, [selectedTrip]);

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
			<div className='container-fluid'>
				<div>
					<form className=' bg-light mb-4 form-ctn z-index-1 srch-form-ctn '>
						<p style={{ color: '#0039a6' }}>
							<b>Discover your next dream destination</b>
						</p>
						<div className='radio-btn-container'>
							<div className='form-check check-box'>
								<input
									class='form-check-input'
									type='radio'
									name='flexRadioDefault'
									id='flexRadioDefault1'
									checked={selectedTrip === 'oneRoundTrip'}
									value='oneRoundTrip'
									onChange={(e) => setSelectedTrip(e.target.value)}
								/>
								<label class='form-check-label'>One Trip</label>
							</div>
							<div class='form-check check-box'>
								<input
									class='form-check-input'
									type='radio'
									name='flexRadioDefault'
									id='flexRadioDefault2'
									value='twoRoundTrip'
									onChange={(e) => setSelectedTrip(e.target.value)}
								/>
								<label class='form-check-label'>Round Trip</label>
							</div>
						</div>
						<div
							className='form-row'
							style={{
								display: 'flex',
								flexWrap: 'wrap',
							}}>
							<div className=' col-md-3 mt-2 mr-3 field-ctn'>
								<label className='form-label'>Depart From</label>{' '}
								<span style={{ color: 'red' }}>*</span>
								<select
									class='form-select'
									id='inputGroupSelect03'
									aria-label='Example select with button addon'
									value={destinationFrom}
									onChange={(e) =>
										setSearchDetails({
											...searchDetails,
											destinationFrom: e.target.value,
										})
									}>
									<option selected>Select City</option>
									{airportsList.map((data, id) => (
										<option key={id} value={data.city_name}>
											{data.city_name}
										</option>
									))}
								</select>
								{requiredDepart ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										{' '}
										Depart From Required
									</p>
								) : (
									''
								)}
							</div>
							<div className=' col-md-3 mt-2 mr-2 field-ctn'>
								<label className='form-label'>Going To</label>{' '}
								<span style={{ color: 'red' }}>*</span>
								<select
									class='form-select'
									id='inputGroupSelect03'
									aria-label='Example select with button addon'
									value={destinationTo}
									onChange={(e) =>
										setSearchDetails({
											...searchDetails,
											destinationTo: e.target.value,
										})
									}>
									<option selected>Select City</option>
									{airportsList.map((data, id) => (
										<option key={id} value={data.city_name}>
											{data.city_name}
										</option>
									))}
								</select>
								{requiredGoing ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										Going To Required
									</p>
								) : (
									''
								)}
							</div>
							<div className=' col-sm-2 mt-2 mr-2 field-ctn'>
								<label className='form-label'>Departure Date</label>{' '}
								<span style={{ color: 'red' }}>*</span>
								<input
									className='form-control'
									type='date'
									placeholder='Start Date'
									value={startDate}
									onChange={(e) =>
										setSearchDetails({
											...searchDetails,
											startDate: e.target.value,
										})
									}
								/>
								{requiredDates ? (
									<p style={{ fontSize: '9px', color: 'red' }}>
										Date are required
									</p>
								) : (
									''
								)}
							</div>
							{selectedTrip === 'twoRoundTrip' && (
								<div className=' col-sm-2 mt-2 mr-2'>
									<label className='form-label'>Return Date</label>{' '}
									<span style={{ color: 'red' }}>*</span>
									<input
										className='form-control'
										type='date'
										placeholder='return Date'
										value={returnDate}
										onChange={(e) =>
											setSearchDetails({
												...searchDetails,
												returnDate: e.target.value,
											})
										}
									/>
									{requiredDates ? (
										<p style={{ fontSize: '9px', color: 'red' }}>
											Date are required
										</p>
									) : (
										''
									)}
								</div>
							)}
						</div>
						<div></div>
						<div className='mt-4'>
							<center>
								{sameInputs ? (
									<p style={{ fontSize: '15px', margin: '10px', color: 'red' }}>
										Source and Destination should not be same
									</p>
								) : (
									''
								)}
								<button className='btn-primary-clr' onClick={searchHandler}>
									Search
								</button>
							</center>
						</div>
					</form>
				</div>

				<div className=' cards-outer-ctn'>
					{!search ||
					requiredDepart ||
					requiredDates ||
					requiredGoing ||
					sameInputs ? (
						<img
							src={SearchIcon}
							width='100px'
							height={'100px'}
							style={{ margin: '15px 30px' }}
						/>
					) : (
						<>
							{fetchedData.length != 0 ? (
								<>
									{fetchedData &&
										fetchedData.map((data, id) => <Cards fetchedData={data} />)}

									{selectedTrip === 'twoRoundTrip' ? (
										<>
											<div style={{ transform: 'rotate(360deg)' }}>
												<CompareArrowsIcon style={{ fontSize: '30px' }} />
											</div>

											{fetchedDataTwo &&
												fetchedDataTwo.map((data, id) => (
													<Cards fetchedData={data} />
												))}
										</>
									) : null}
								</>
							) : (
								<img src={noFlightFound} width='500px' height={'350px'} />
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Home);
