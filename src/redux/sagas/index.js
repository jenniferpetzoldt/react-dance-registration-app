import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
// import registrationSaga from './registrationSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    // registrationSaga(),
    // watchIncrementAsync()
  ]);
}
