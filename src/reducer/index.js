import { combineReducers } from 'redux';
import campaigns from './campaigns';
import encounters from './encounters';
import characters from './characters';
import creatures from './creatures';
import messages from './messages';
import user from './user';

export default combineReducers({
	campaigns,
	encounters,
	characters,
	creatures,
	messages,
	user
});
