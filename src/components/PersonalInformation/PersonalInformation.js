import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import { TextField, Button, FormLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
const mapStateToProps = state => ({
    user: state.user,
    state,
});

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalInformation: {
                userId: this.props.state.user.id,
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
        this.props.dispatch({ type: 'ADD_PERSONAL_INFO', payload: this.state.personalInformation });
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
                    <h3>1. Personal Information:</h3>
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
                            value={this.state.personalInformation.admission}
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
                    <p>* Comment about student discount</p>
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