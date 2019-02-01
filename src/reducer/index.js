import { combineReducers } from 'redux';
import campaigns from './campaigns';
import encounters from './encounters';
import creatures from './creatures';
import user from './user';

export default combineReducers({
	campaigns,
	encounters,
	creatures,
	user
});
