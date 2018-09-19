import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';

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
                    <label>First Name:</label>
                    <input name="firstName" onChange={this.handleChange} />
                    <br />
                    <label>Last Name:</label>
                    <input name="lastName" onChange={this.handleChange} />
                    <br />
                    <label>Email:</label>
                    <input name="email" onChange={this.handleChange}/>
                    <br />
                    <label>Role:</label>
                    <select name="role" onChange={this.handleChange} value={this.state.value}>
                    <option value="">Select Role</option>
                    {this.state.roles.map((role, i) => {
                        return <option key={i} value={role}>{role}</option>
                    })}
                    </select>
                    <br />
                    <label>Admission:</label>
                    <select name="admission" onChange={this.handleChange} value={this.state.value}>
                    <option value="">Select Admission</option>
                    {this.state.admissions.map((admission, i)=>{
                        return <option key={i} value={admission}>{admission}</option>
                    })}
                    </select>
                    <br />
                    <p>Students with student id recieve discount</p>
                    <input type="submit" value="Submit" />
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