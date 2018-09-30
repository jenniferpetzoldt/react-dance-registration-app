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
        margin: 15,
    },
    textField: {
        width: 55,
    }
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
                <form style={styles.form}>
                    <FormControl style={styles.formControl}>
                        <TextField label="First Name" name="firstName" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField label="Last Name" name="lastName" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField label="Email Address" name="email" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup name="role" value={this.state.role} onChange={this.handleChange}>
                            <FormControlLabel value='Leader' control={<Radio color="primary" />}
                                label='Leader' />
                            <FormControlLabel value='Follower' control={<Radio color="primary" />}
                                label='Follower' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup name="admission" value={this.state.admission} onChange={this.handleChange}>
                            <FormControlLabel value='general' control={<Radio color="primary" />}
                                label='General' />
                            <FormControlLabel value='student' control={<Radio color="primary" />}
                                label='Student' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <FormLabel>7:00 pm</FormLabel>
                        <RadioGroup
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
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 1" name="week1" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 2" name="week2" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 3" name="week3" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 4" name="week4" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <Button className="submit" varient="raised" onClick={this.sendNewDancerInfo}>Submit</Button>
                    <Button className="close" varient="raised" onClick={this.props.toggleAddDancer}>Close Form</Button>
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