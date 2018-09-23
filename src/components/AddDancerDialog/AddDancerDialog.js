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
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            admission: '',
            first: '',
            second: '',
            paid: '',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            note: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    addDancer = () => {
        this.props.dispatch({ type: 'ADD_NEW_DANCER', payload: this.state });
    }

    onClose = () => {
        console.log('adminInput:', this.props.state.adminInput);
        axios({
            method: 'POST',
            url: '/api/admin',
            data: { newReg: this.props.state.adminInput }
        }).then((response) => {
            console.log('success with registration POST');
            this.props.dispatch({ type: 'CLEAR_ADMIN_INPUT' });
            this.props.setState({
                open: false,
            });
        }).catch((error) => {
            console.log('Add Dancer Reg POST error', error);
            alert('Unable to add dancer reg from admin');
        })
    }

    handleClick = (event) => {
        this.addDancer();
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form>
                    <FormControl>
                        <TextField
                            label="First Name"
                            name="firstName"
                            onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl>
                        <TextField
                            label="Email Address"
                            name="email"
                            onChange={this.handleChnage} />
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                            name="role"
                            value={this.state.role}
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
                    <FormControl>
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup
                            name="admission"
                            value={this.state.admission}
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
                    <br />
                    <FormControl>
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
                    <FormControl>
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
                    <Button onClick={this.handleClick}>Submit</Button>
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