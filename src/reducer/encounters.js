import { LOAD_ENCOUNTERS, ADD_ENCOUNTER, UPDATE_ENCOUNTER, DELETE_ENCOUNTER } from '../constants';

export default (encounters = [], action) => {
	switch(action.type) {
	case LOAD_ENCOUNTERS:
		return action.payload;
	case ADD_ENCOUNTER:
		// debugger;
		if (encounters.some(encounter => encounter.campaign.id === action.payload.campaign.id)) return [ ...encounters, action.payload ];
		else return encounters;
	case UPDATE_ENCOUNTER:
		// eslint-disable-next-line
		const index = encounters.findIndex(encounter => encounter.id === action.payload.id);

		return [ ...encounters.slice(0, index), action.payload, ...encounters.slice(index + 1) ];
	case DELETE_ENCOUNTER:
		return encounters.filter(enc => enc.id !== action.payload)
	default:
		return encounters;
	}
};
