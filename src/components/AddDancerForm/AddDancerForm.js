import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FormControl, Radio, TextField, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    formControl: {
        marginRight: 20,
        paddingBottom: 10,
    },
    textField: {
        width: 55,
    },
    inputField: {
        width: 100,
    },
    emailField: {
        width: 200,
        paddingRight: 80,
    },
}

class AddDancerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            admission: '',
            first: '',
            second: '',
            paid: '0',
            paymentMethod: 'Pay at the door',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
        };
    }
    //updates local state as admin inputs information
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    //resets the form so the admin does not need to clear the fields
    clearInputs = () => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            admission: '',
            first: '',
            second: '',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
        })
    };

    // submits new registration to server & database and calls clearInputs()
    sendNewDancerInfo = () => {
        axios({
            method: 'POST',
            url: '/api/admin',
            data: { newReg: this.state }
        }).then((response) => {
            console.log('success with addDancer POST');
            this.clearInputs();
            this.getRegistrations();
        }).catch((error) => {
            console.log('Add Dancer Reg POST error', error);
            alert('Unable to add dancer reg from admin');
        })
    }

    getRegistrations = () => {
        axios({
            method: 'GET',
            url: '/api/registration/' + this.state.formId
        }).then((response) => {
            const registrations = response.data;
            const action = { type: 'ADD_ATTEND_DATA', payload: registrations };
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('Registrations GET error', error);
            alert('Unable to GET registrations');
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName && this.props.user.admin === true) {
            content = (
                <form id="addDancerForm" style={styles.form}>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.inputField} label="First Name" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.inputField} label="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.emailField} label="Email Address" name="email" value={this.state.email} onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 1" name="week1" value={this.state.week1} onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 2" name="week2" value={this.state.week2} onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 3" name="week3" value={this.state.week3} onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 4" name="week4" value={this.state.week4} onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl style={styles.formControl}>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup id="role" name="role" value={this.state.role} onChange={this.handleChange}>
                            <FormControlLabel value='Leader' control={<Radio color="primary" />}
                                label='Leader' />
                            <FormControlLabel value='Follower' control={<Radio color="primary" />}
                                label='Follower' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup id="admission" name="admission" value={this.state.admission} onChange={this.handleChange}>
                            <FormControlLabel value='general' control={<Radio color="primary" size="small" />}
                                label='General' />
                            <FormControlLabel value='student' control={<Radio color="primary" size="small" />}
                                label='Student' />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <FormControl style={styles.formControl}>
                        <FormLabel>7:00 pm</FormLabel>
                        <RadioGroup
                            id="firstHour"
                            aria-label="7:00pm - 8:15pm"
                            name="first"
                            value={this.state.first}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value={this.props.state.attend[0].level_one}
                                control={<Radio color="primary" />}
                                label={this.props.state.attend[0].level_one} />
                            <FormControlLabel
                                value={this.props.state.attend[0].level_four}
                                control={<Radio color="primary" />}
                                label={this.props.state.attend[0].level_four} />
                            <FormControlLabel
                                value={this.props.state.attend[0].solo_jazz}
                                control={<Radio color="primary" />}
                                label={this.props.state.attend[0].solo_jazz} />
                            <FormControlLabel
                                value=''
                                control={<Radio color="primary" />}
                                label="None" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <FormLabel>8:30 pm</FormLabel>
                        <RadioGroup
                            id="secondHour"
                            aria-label="8:30pm - 9:45pm"
                            name="second"
                            value={this.state.second}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value={this.props.state.attend[0].level_two}
                                control={<Radio color="primary" />}
                                label={this.props.state.attend[0].level_two} />
                            <FormControlLabel
                                value={this.props.state.attend[0].level_three}
                                control={<Radio color="primary" />}
                                label={this.props.state.attend[0].level_three} />
                            <FormControlLabel
                                value={this.props.state.attend[0].level_five}
                                control={<Radio color="primary" />}
                                label={this.props.state.attend[0].level_five} />
                            <FormControlLabel
                                value=''
                                control={<Radio color="primary" />}
                                label="None" />
                        </RadioGroup>
                    </FormControl>
                    
                    <br />
                    <Button className="cancel" varient="raised" onClick={this.props.toggleAddDancer}>Close Form</Button>
                    <Button className="submit" varient="raised" onClick={this.sendNewDancerInfo}>Submit</Button>
                </form>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
export default connect(mapStateToProps)(AddDancerDialog);