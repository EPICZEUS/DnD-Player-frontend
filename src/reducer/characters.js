import { LOAD_CHARACTERS, ADD_CHARACTER, UPDATE_CHARACTER } from '../constants';

export default (characters = [], action) => {
	switch(action.type) {
	case LOAD_CHARACTERS:
		return action.payload;
	case ADD_CHARACTER:
		return [ ...characters, action.payload ];
	case UPDATE_CHARACTER:
		// eslint-disable-next-line
		const index = characters.findIndex(char => char.id === action.payload.id);

		return [ ...characters.slice(0, index), action.payload, ...characters.slice(index + 1) ];
	default: 
		return characters;
	}
};