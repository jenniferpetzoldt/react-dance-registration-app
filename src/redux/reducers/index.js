import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import createFormReducer from './createFormReducer';
import formReducer from './formReducer';

const store = combineReducers({
  user,
  login,
  createFormReducer,
  formReducer,
});

export default store;
