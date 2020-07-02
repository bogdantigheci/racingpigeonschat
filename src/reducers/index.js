import { combineReducers } from 'redux';
import user from './user';
import channel from './channel';

const reducer = combineReducers({ user, channel });

export default reducer;