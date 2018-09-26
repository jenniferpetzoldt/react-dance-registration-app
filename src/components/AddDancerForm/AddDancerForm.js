import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FormControl, Radio, TextField, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

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
            console.log('success with registration POST');
            this.clearInputs();
        }).catch((error) => {
            console.log('Add Dancer Reg POST error', error);
            alert('Unable to add dancer reg from admin');
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form>
                    <div>
                    <FormControl>
                        <TextField label="First Name" name="firstName" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <TextField label="Last Name" name="lastName" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <TextField label="Email Address" name="email" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup name="role" value={this.state.role} onChange={this.handleChange}>
                            <FormControlLabel value='leader' control={<Radio color="primary" />}
                                                label='Leader' />
                            <FormControlLabel value='follower' control={<Radio color="primary" />} 
                                                label='Follower' />
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup name="admission" value={this.state.admission} onChange={this.handleChange}>
                            <FormControlLabel value='general' control={<Radio color="primary" />} 
                                                label='General' />
                            <FormControlLabel value='student' control={<Radio color="primary" />} 
                                                label='Student' />
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
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
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
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
                        </RadioGroup>
                    </FormControl>
                    </div>
                    <br />
                    <div>
                    <FormControl>
                        <TextField label="Week 1" name="week1" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <TextField label="Week 2" name="week2" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <TextField label="Week 3" name="week3" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <TextField label="Week 4" name="week4" onChange={this.handleChange} />
                    </FormControl>
                    </div>
                    <br />
                    <Button  className="submit" varient="raised" onClick={this.sendNewDancerInfo}>Submit</Button>
                    <Button  className="close" varient="raised"  onClick={this.props.toggleAddDancer}>Close Form</Button>
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