import {
	SELECTED_FLIGHT_REQUEST,
	SELECTED_FLIGHT_SUCCESS,
	GET_FLIGHTS_DATA,
	GET_AIRPORTS_LIST,
	UPDATE_STATE_REFRESH,
	GET_CANCELTICKET_DATA,
	CANCEL_FLIGHTTICKET_DATA,
} from '../types';

export const flightDetailsReducer = (
	state = { flightsList: [], isRefresh: false },
	action
) => {
	switch (action.type) {
		case SELECTED_FLIGHT_REQUEST:
			return {
				loading: true,
			};
		case SELECTED_FLIGHT_SUCCESS:
			return {
				loading: false,
				selectedFlight: action.payload,
			};
		case GET_FLIGHTS_DATA:
			return {
				flightsList: action.payload,
			};
		case UPDATE_STATE_REFRESH:
			return {
				isRefresh: action.payload,
			};

		default:
			return state;
	}
};

export const ticketsDetailsReducer = (
	state = { flightsList: [], cancelingFlight: null },
	action
) => {
	switch (action.type) {
		case GET_CANCELTICKET_DATA:
			return {
				canceledList: action.payload,
			};
		case CANCEL_FLIGHTTICKET_DATA:
			return {
				cancelingFlight: action.payload,
			};
		default:
			return state;
	}
};
