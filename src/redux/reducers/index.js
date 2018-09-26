import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import createForm from './createFormReducer';
import form from './formReducer';
import userInput from './userInputReducer';
import attend from './attendanceReducer.js';
import adminInput from './adminInputReducer.js';
import attenTableData from './attendTableDataReducer.js';

const store = combineReducers({
  user,
  login,
  createForm,
  form,
  userInput,
  attend,
  adminInput,
  attenTableData,
});

export default store;
