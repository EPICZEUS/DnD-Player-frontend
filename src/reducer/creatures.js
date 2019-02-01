export default (creatures = [], action) => {
	switch(action.type) {
	case "LOAD_CREATURES":
		return action.payload;
	default:
		return creatures;
	}
};