import axios from 'axios';
import {
	GET_FLIGHTS_DATA,
	GET_AIRPORTS_LIST,
	GET_CANCELTICKET_DATA,
} from '../types';

export const getFlightslist = () => async (dispatch) => {
	await axios
		.get('http://localhost:8000/flights')
		.then((res) => {
			console.log(res);
			dispatch({
				type: GET_FLIGHTS_DATA,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
export const cancelTicketHandler = (data) => (dispatch) => {
	const { flightId, passengerDetails } = data;
	const noOfPass = passengerDetails.length;
	console.log(
		'-----------action----',
		'selecteddata',
		data,
		flightId,
		'availabel seats',
		data.seats - noOfPass,
		'booked',
		data.bookedSeats + noOfPass,
		'canceled',
		data.canceled - noOfPass
	);
	const req = {
		flightCarrer: data.flightCarrer,
		OriginCity: data.OriginCity,
		flightCode: data.flightCode,
		OrigAirportName: data.OrigAirportName,
		DestinationCity: data.DestinationCity,
		DestAirportName: data.DestAirportName,
		DepartureDate: data.DepartureDate,
		DepartureTime: data.DepartureTime,
		ArrivalDate: data.ArrivalDate,
		ArrivalTime: data.ArrivalTime,
		ImageUrl: data.ImageUrl,
		Price: data.Price,
		seats: data.seats + noOfPass,
		bookedSeats: data.bookedSeats - noOfPass,
		canceled: data.canceled + noOfPass,
		block: data.block,
	};
	console.log('update books seats request', req);
	axios
		.put(`http://localhost:8000/flights?id=${flightId}`, req)
		.then((res) => {
			console.log(res);
			dispatch({
				type: GET_CANCELTICKET_DATA,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log('error----', err);
		});
};
