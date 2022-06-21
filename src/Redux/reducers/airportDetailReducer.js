import { GET_AIRPORTS_LIST } from '../types';

export const airportsDetailsReducer = (
	state = { airportsList: {} },
	action
) => {
	switch (action.type) {
		case GET_AIRPORTS_LIST:
			return {
				airportsList: action.payload,
			};
		default:
			return state;
	}
};
