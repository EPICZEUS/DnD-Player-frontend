export default (encounters = [], action) => {
	switch(action.type) {
	case "LOAD_ENCOUNTERS":
		return action.payload;
	case "ADD_ENCOUNTER":
		return [ ...encounters, action.payload ];
	case "UPDATE_ENCOUNTER":
		// eslint-disable-next-line
		const index = encounters.findIndex(encounter => encounter.id === action.payload.id);

		return [ ...encounters.slice(0, index), action.payload, ...encounters.slice(index + 1) ];
	default:
		return encounters;
	}
};
