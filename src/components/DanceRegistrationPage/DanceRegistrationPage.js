import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { InputLabel, FormControl, FormHelperText, MenuItem, Select, Button } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
  state,
});

const styles = {
  formControl: {
    width: 200,
  },
}

// needed for concatinating menu item
const space = " ";

class DanceRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formId: '', //stores id of selected form to later send to redux
    }
  }

  // on page load retrieves form options from database
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getFormMonths();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  // retrieves the id, month, and year for each form in the wed_form table
  getFormMonths = () => {
    axios({
      method: 'GET',
      url: '/api/form'
    }).then((response) => {
      console.log('GET form months:', response.data);
      const formMonths = response.data;
      const action = { type: 'UPDATE_FORM_MONTHS', payload: formMonths };
      this.props.dispatch(action);
    }).catch((error) => {
      console.log('GET forms error', error);
      alert('Unable to get forms');
    })
  }

  // retrieves all the information assosiated with the selected form's id. 
  // then send's it to redux, and sends the user to the next page of the form
  getSpecificFormData = () => {
    console.log('selected id:', this.state.formId)
    axios({
      method: 'GET',
      url: '/api/form/' + this.state.formId
    }).then((response) => {
      console.log('GET specific form:', response.data);
      const selectedForm = response.data;
      const action = { type: 'SET_FORM_DATA', payload: selectedForm };
      this.props.dispatch(action);
      this.props.history.push('/personal');
    }).catch((error) => {
      console.log('GET specific form ERROR', error);
      alert('Unable to get specific form');
    })
  }

  // sets local state variable 'selectedFormId' to the id of the form 
  handleChange = (event) => {
    this.setState({
      formId: event.target.value,
    });
  }
  
  // adds the form id to redux and pulls thinformation
  handleClick = (event) => {
    console.log('selectedFormID', this.state.formId);
    this.props.dispatch({ type: 'ADD_FORM_ID', payload: this.state });
    this.getSpecificFormData();
  }


  render() {
    let content = null;
    //only loads page content if user is logged in
    if (this.props.user.userName && this.props.user.admin === false) {
      content = (
        <form id="registrationSelect">
          <FormControl style={styles.formControl}>
            <InputLabel htmlFor="formSelect">Select Month</InputLabel>
            <Select
              inputProps={{ name: 'formSelect', id: "formSelect" }}
              value={this.state.formId}
              onChange={this.handleChange}>
              {this.props.state.form.map((formMonth, i) => {
                return (<MenuItem key={i} value={formMonth.id}>{formMonth.form_month + space + formMonth.form_year}</MenuItem>)
              })}
            </Select>
            <FormHelperText>Select Registration Month</FormHelperText>
          </FormControl>
          <br />
          <Button className="next" varient="raised" onClick={this.handleClick}>Next</Button>
        </form>
      );
    }

    return (
      <div>
        <Nav history={this.props.history}/>
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(DanceRegistrationPage);