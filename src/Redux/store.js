import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { airportsDetailsReducer } from './reducers/airportDetailReducer';
import {
	flightDetailsReducer,
	ticketsDetailsReducer,
} from './reducers/flightDetailsReducer';

import { userAuthLogin, userAuthReg } from './reducers/personalInfoReducer';

export const initialState = {
	personInfo: {},
};

const reducer = combineReducers({
	flightData: flightDetailsReducer,
	userAuth: userAuthLogin,
	userAuthReg: userAuthReg,
	airportData: airportsDetailsReducer,
	ticketsData: ticketsDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
