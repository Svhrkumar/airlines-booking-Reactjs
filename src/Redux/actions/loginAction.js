import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { USERLOGIN_FAIL, USERLOGIN_REQUEST, USERLOGIN_SUCCESS } from '../types';

export const signinHandler = (req) => async (dispatch) => {
	const { email, password } = req;
	console.log('login click', email, password);
	if (email === 'admin1' && password === '123456789') {
		console.log('login click', req);
		dispatch({
			type: USERLOGIN_SUCCESS,
			payload: true,
		});

		sessionStorage.setItem('token', JSON.stringify(uuidv4()));
	}
};
