import { LOAD_CREATURES, UPDATE_CREATURE } from '../constants';

export default (creatures = [], action) => {
	switch(action.type) {
	case LOAD_CREATURES:
		return action.payload;
	case UPDATE_CREATURE:
		// eslint-disable-next-line
		const index = creatures.find(crea => crea.id === action.payload.id);

		return [ ...creatures.slice(0, index), action.payload, ...creatures.slice(index + 1) ];
	default:
		return creatures;
	}
};