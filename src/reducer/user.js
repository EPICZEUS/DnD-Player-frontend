import { LOGIN, LOGOUT } from '../constants';

export default (user = {}, action) => {
	switch(action.type) {
	case LOGIN:
		localStorage.token = action.payload.token;
		return action.payload.user;
	case LOGOUT:
		delete localStorage.token;
		return null;
	default: 
		return user;
	}
};
