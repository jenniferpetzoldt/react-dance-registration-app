import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import {TextField, Button, MenuItem, Select} from '@material-ui/core';
const mapStateToProps = state => ({
    user: state.user,
    state,
});

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: ['Leader', 'Follower'],
            admissions: ['General', 'Student'],
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
    
    addPersonalInformation = event => {
        event.preventDefault();
        this.props.dispatch({type: 'ADD_PERSONAL_INFO', payload: this.state.personalInformation});
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
                    <Select 
                    className="formSelect"
                    label="Role" 
                    name="role" 
                    onChange={this.handleChange} 
                    value={this.state.personalInformation.role}>
                    <MenuItem value="">Select Role</MenuItem>
                    {this.state.roles.map((role, i) => {
                        return <MenuItem key={i} value={role}>{role}</MenuItem>
                    })}
                    </Select>
                    <br />
                    <Select 
                    className="formSelect"
                    label= "Admission"
                    onChange={this.handleChange} 
                    value={this.state.personalInformation.admission}>
                    <MenuItem value="">Select Admission</MenuItem>
                    {this.state.admissions.map((admission, i)=>{
                        return <MenuItem key={i} value={admission}>{admission}</MenuItem>
                    })}
                    </Select>
                    <br />
                    <p>Students with student id recieve discount</p>
                    <Button className="next" varient="raised" onClick={this.addPersonalInformation}>Next</Button>
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