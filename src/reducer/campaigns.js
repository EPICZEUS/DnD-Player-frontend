export default (campaigns = [], action) => {
	switch (action.type) {
	case "LOAD_CAMPAIGNS":
		return action.payload;
	case "ADD_CAMPAIGN":
		return [ ...campaigns, action.payload ];
	case "DELETE_CAMPAIGN":
		return campaigns.filter(c => c.id !== action.payload);
	default:
		return campaigns;
	}
};
