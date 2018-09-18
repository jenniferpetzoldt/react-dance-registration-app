import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import Lessons from '../Lessons/Lessons';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import Confirm from '../Confirm/Confirm';

const mapStateToProps = state => ({
  user: state.user,
  state,
});

class DanceRegistrationPage extends Component {
  constructor()
 
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getForms();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

getForms(){
  axios({
    method: 'GET',
    url: '/api/form'
  }).then((response)=>{
    console.log('GET forms:', response.data);
    const forms = response.data;
    const action = {type: 'UPDATE_FORM', payload: forms};
    this.props.dispatch(action);
  }).catch((error)=>{
    console.log('GET forms error', error);
    alert('Unable to get forms');
  })
}

handleChange = (event) => {
  console.log('select', event.target.value)
}

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <div>
            <label>select registration month</label>
            <select onChange={this.handleChange} value={this.props.state.formReducer.month} >
            <option value="">Select Registration Month</option>
            {this.props.state.formReducer.map((form, i)=> {
              return <option key={i} value={form.id}>{form.month + form.year}</option>
            })}
            </select>
            <button>Select</button>
          </div>

          <form>
            <RegistrationTitle />
            <PersonalInformation />
            <Lessons />
            <PaymentMethod />
            <Confirm />
          </form>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DanceRegistrationPage);
