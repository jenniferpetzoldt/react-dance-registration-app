import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DanceRegistrationPage from './components/DanceRegistrationPage/DanceRegistrationPage';
import Profile from './components/Profile/Profile';
import SuccessPage from './components/SuccessPage/SuccessPage';
import AttendancePage from './components/AttendancePage/AttendancePage';
import CreateFormPage from './components/CreateFormPage/CreateFormPage';
import PersonalInformation from './components/PersonalInformation/PersonalInformation';
import Lessons from './components/Lessons/Lessons';
import PaymentMethod from './components/PaymentMethod/PaymentMethod';
import ClassNameInput from './components/ClassNameInput/ClassNameInput';


import './styles/main.css';

const App = () => (
  <div>
    <Header title="attenDance" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/profile"
          component={Profile}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/registration"
          component={DanceRegistrationPage}
        />
        <Route
          path="/personal"
          component={PersonalInformation}
          />
        <Route
          path="/lessons"
          component={Lessons}
          />
        <Route
          path="/payment"
          component={PaymentMethod}
          />
        <Route
          path="/success"
          component={SuccessPage}
        />
        <Route
          path="/attendance"
          component={AttendancePage}
        />
        <Route
          path="/form"
          component={CreateFormPage}
        />
         <Route
          path="/classnames"
          component={ClassNameInput}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
