import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import createFormReducer from './createFormReducer';

const store = combineReducers({
  user,
  login,
  createFormReducer,
});

export default store;
