import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  state,
});

class DanceRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormId: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getFormMonths();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

getFormMonths = () => {
  axios({
    method: 'GET',
    url: '/api/form'
  }).then((response)=>{
    console.log('GET form months:', response.data);
    const formMonths = response.data;
    const action = {type: 'UPDATE_FORM_MONTHS', payload: formMonths};
    this.props.dispatch(action);
  }).catch((error)=>{
    console.log('GET forms error', error);
    alert('Unable to get forms');
  })
}

getSpecificFormData = () => {
  console.log('selected id:', this.state.selectedFormId)
  axios({
    method: 'GET',
    url: '/api/form/' + this.state.selectedFormId
  }). then((response)=>{
    console.log('GET specific form:', response.data);
    const selectedForm = response.data;
    const action = {type: 'SET_FORM_DATA', payload: selectedForm};
    this.props.dispatch(action);
  }).catch((error)=> {
    console.log('GET specific form ERROR', error);
    alert('Unable to get specific form');
  })
}

handleChange = (event) => {
  this.setState({
      selectedFormId: event.target.value,
  });
}

handleClick = (event) => {
  console.log('selectedFormID', this.state.selectedFormId);
  this.props.dispatch({type: 'ADD_FORM_ID', payload: this.state});
  this.getSpecificFormData();
  this.props.history.push('/personal');
}


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
          <div>
            <label>select registration month</label>
            <select onChange={this.handleChange} value={this.props.state.formReducer.month} >
            <option value="">Select Registration Month</option>
            {this.props.state.formReducer.map((formMonth, i)=> {
              return <option key={i} value={formMonth.id}>{formMonth.form_month + ' ' + formMonth.form_year}</option>
            })}
            </select>
            <button onClick={this.handleClick}>Next</button>
            {/* {JSON.stringify(this.props.state.formReducer)} */}

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
