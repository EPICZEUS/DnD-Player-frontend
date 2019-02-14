import { LOAD_MESSAGES, ADD_MESSAGE, UPDATE_MESSAGE, DELETE_MESSAGE } from '../constants';

export default (messages = [], action) => {
	switch(action.type) {
	case LOAD_MESSAGES:
		return action.payload;
	case ADD_MESSAGE:
		return [ ...messages, action.payload ];
	case UPDATE_MESSAGE:
		// eslint-disable-next-line
		const index = messages.findIndex(m => m.id === action.payload.id);

		return [ ...messages.slice(0, index), action.payload, ...messages.slice(index + 1)];
	case DELETE_MESSAGE:
		return messages.filter(m => m.id !== action.payload);
	default:
		return messages;
	}
}