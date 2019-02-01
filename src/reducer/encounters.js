export default (encounters = [], action) => {
	switch(action.type) {
	case "LOAD_ENCOUNTERS":
		return action.payload;
	case "ADD_ENCOUNTER":
		return [ ...encounters, action.payload ];
	default:
		return encounters;
	}
};
