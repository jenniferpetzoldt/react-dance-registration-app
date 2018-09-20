import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import createFormReducer from './createFormReducer';
import formReducer from './formReducer';
import registrationReducer from './registrationReducer';
import userInputReducer from './userInputReducer';

const store = combineReducers({
  user,
  login,
  createFormReducer,
  formReducer,
  registrationReducer,
  userInputReducer,
});

export default store;
