import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import formReducer from './formReducer';

const store = combineReducers({
  user,
  login,
  formReducer,
});

export default store;
