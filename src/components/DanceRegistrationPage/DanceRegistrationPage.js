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
      display: 'flex',
      flexWrap: 'wrap',

  },
}

const space = " ";

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

  getSpecificFormData = () => {
    console.log('selected id:', this.state.selectedFormId)
    axios({
      method: 'GET',
      url: '/api/form/' + this.state.selectedFormId
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

  handleChange = (event) => {
    this.setState({
      selectedFormId: event.target.value,
    });
  }

  handleClick = (event) => {
    console.log('selectedFormID', this.state.selectedFormId);
    this.props.dispatch({ type: 'ADD_FORM_ID', payload: this.state });
    this.getSpecificFormData();
  }


  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <form>
        <FormControl style={styles.formControl}>
          <InputLabel htmlFor="formSelect">Select Month</InputLabel>
              <Select 
             inputProps={{name: 'formSelect', id: "formSelect"}}
              value={this.state.selectedFormId} 
              onChange={this.handleChange}
               >
                {this.props.state.formReducer.map((formMonth, i) => {
                  return (<MenuItem key={i} value={formMonth.id}>{formMonth.form_month + space + formMonth.form_year}</MenuItem>)
                })}
              </Select>
              <FormHelperText>Select Registration Month</FormHelperText>
              </FormControl>
             
              <Button className="next" varient="raised" onClick={this.handleClick}>Next</Button>
             
              </form>
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