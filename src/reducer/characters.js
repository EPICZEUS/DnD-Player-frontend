import { LOAD_CHARACTERS, ADD_CHARACTER } from '../constants';

export default (characters = [], action) => {
	switch(action.type) {
	case LOAD_CHARACTERS:
		return action.payload;
	case ADD_CHARACTER:
		return [ ...characters, action.payload.character ];
	default: 
		return characters;
	}
};