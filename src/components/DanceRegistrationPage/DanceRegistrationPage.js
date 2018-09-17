import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import Lessons from '../Lessons/Lessons';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import Confirm from '../Confirm/Confirm';

const mapStateToProps = state => ({
  user: state.user,
});

class DanceRegistrationPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <div>
          <label>select registration month</label>
          <select></select>
          <button>Select</button>
        </div>

        <form>
          <RegistrationTitle/>
          <PersonalInformation/>
          <Lessons/>
          <PaymentMethod/>
          <Confirm/>
        </form>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DanceRegistrationPage);
