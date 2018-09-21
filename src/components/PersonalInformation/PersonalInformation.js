import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import {TextField, InputLabel, Button, MenuItem, Select, FormLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
const mapStateToProps = state => ({
    user: state.user,
    state,
});

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalInformation: {
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                admission: '',
            }
        }
    }

    handleChange = (event) => {
        this.setState({
            personalInformation: {
                ...this.state.personalInformation,
                [event.target.name]: event.target.value,
            },
        });
    }
    
    addPersonalInformation = () => {
        this.props.dispatch({type: 'ADD_PERSONAL_INFO', payload: this.state.personalInformation});
    }

    handleClick = (event) => {
        this.addPersonalInformation();
        this.props.history.push('/lessons');
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
               
                <form onSubmit={this.addPersonalInformation}>
                    <RegistrationTitle />
                    {JSON.stringify(this.state.personalInformation)}
                    <h3>1. Personal Information:</h3>
                    <TextField label="First Name" name="firstName" onChange={this.handleChange} />
                    <br />
                    <TextField label="Last Name" name="lastName" onChange={this.handleChange} />
                    <br />
                    <TextField label="Email Address" name="email" onChange={this.handleChange}/>
                    <br />
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                        name="role"
                        value={this.state.personalInformation.role}
                        onChange={this.handleChange}
                        >
                        <FormControlLabel
                        value='Leader'
                        control={<Radio color="primary" />}
                        label='Leader'/>
                        <FormControlLabel
                        value='Follower'
                        control={<Radio color="primary" />}
                        label='Follower' />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <FormControl>
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup
                        name="admission"
                        value={this.state.personalInformation.admission}
                        onChange={this.handleChange}
                        >
                        <FormControlLabel
                        value='General'
                        control={<Radio color="primary" />}
                        label='General'/>
                        <FormControlLabel
                        value='Student'
                        control={<Radio color="primary" />}
                        label='Student' />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <p>Students with student id recieve discount</p>
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

export default connect(mapStateToProps)(PersonalInformation);