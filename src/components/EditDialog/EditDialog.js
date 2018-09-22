import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { FormControl, Radio, TextField, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            personalInformation: {
                userId: this.props.state.user.id,
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                admission: '',
            },
        } 
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <h1>Confirm Registration Information</h1>
                        <h3>PersonalInformation:</h3>
                        <FormControl>
                    <TextField 
                    label="First Name" 
                    name="firstName" 
                    value={this.props.state.userInput.userInfo.firstName}
                    onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl>
                    <TextField 
                    label="Last Name" 
                    name="lastName" 
                    value={this.props.state.userInput.userInfo.lastName}
                    onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl> 
                    <TextField 
                    label="Email Address" 
                    name="email" 
                    value={this.props.state.userInput.userInfo.email}
                    onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                            name="role"
                            value={this.state.personalInformation.role}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value='leader'
                                control={<Radio color="primary" />}
                                label='Leader' />
                            <FormControlLabel
                                value='follower'
                                control={<Radio color="primary" />}
                                label='Follower' />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup
                            name="admission"
                            value={this.props.state.userInput.userInfo.role}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value='general'
                                control={<Radio color="primary" />}
                                label='General' />
                            <FormControlLabel
                                value='student'
                                control={<Radio color="primary" />}
                                label='Student' />
                        </RadioGroup>
                    </FormControl>
                        
                        <h3>Lessons:</h3>
                        <p>7:00pm-8:15pm {this.props.state.userInput.firstHour.className}</p>
                        <p>8:30pm-9:45pm {this.props.state.userInput.secondHour.className}</p>
                        <h3>Payment Method:</h3>
                        {this.props.state.userInput.payment.paymentMethod}
                        <h3>Total Cost:</h3>
                        <p>${this.props.state.userInput.total}.00</p>
                        <br />
                        <button onClick={this.submitRegistration}>Submit</button>
                        <button >Edit</button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}


export default connect(mapStateToProps)(EditDialog);