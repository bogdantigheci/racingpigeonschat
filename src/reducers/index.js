import { combineReducers } from 'redux';
import user from './user';
import channel from './channel';
import colors from './colors';

const reducer = combineReducers({ user, channel, colors });

export default reducer;
