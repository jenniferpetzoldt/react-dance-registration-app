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

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Dance Plan It" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
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
          path="/profile"
          component={Profile}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
