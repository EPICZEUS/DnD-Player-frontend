import { LOAD_CAMPAIGNS, ADD_CAMPAIGN, DELETE_CAMPAIGN, UPDATE_CAMPAIGN } from '../constants';

export default (campaigns = [], action) => {
	switch (action.type) {
	case LOAD_CAMPAIGNS:
		return action.payload;
	case ADD_CAMPAIGN:
		return [ ...campaigns, action.payload ];
	case DELETE_CAMPAIGN:
		return campaigns.filter(c => c.id !== action.payload);
	case UPDATE_CAMPAIGN:
		// eslint-disable-next-line
		const index = campaigns.findIndex(campaign => campaign.id === action.payload.id);

		return [ ...campaigns.slice(0, index), action.payload, ...campaigns.slice(index + 1) ];
	default:
		return campaigns;
	}
};
