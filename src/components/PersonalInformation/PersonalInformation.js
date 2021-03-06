import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import { TextField, Button, FormLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    formControl: {
        marginRight: 15,
    },
    textField: {
        width: 120,
    },
    emailField: {
        width: 200,
    },
}

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

    cancelClick = (event) => {
        this.props.history.push('/registration');
    }

    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === false) {
            content = (
                <form  id="personalForm" onSubmit={this.addPersonalInformation}>
                    <RegistrationTitle />
                    <h3>Personal Information:</h3>
                    <FormControl style={styles.formControl}>
                    <TextField
                    style={styles.textField}
                    label="First Name" 
                    name="firstName" 
                    onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                    <TextField
                    style={styles.textField}
                    label="Last Name" 
                    name="lastName" 
                    onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}> 
                    <TextField
                    style={styles.emailField}
                    label="Email Address" 
                    name="email" 
                    onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <FormControl id="roleControl">
                        <FormLabel>Role</FormLabel>
                        <RadioGroup
                            id="role"
                            name="role"
                            value={this.state.personalInformation.role}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value='Leader'
                                control={<Radio color="primary" />}
                                label='Leader' />
                            <FormControlLabel
                                value='Follower'
                                control={<Radio color="primary" />}
                                label='Follower' />
                        </RadioGroup>
                    </FormControl>
                    <FormControl id="admissionControl">
                        <FormLabel>Admission</FormLabel>
                        <RadioGroup
                            id="admission"
                            name="admission"
                            value={this.state.personalInformation.admission}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value='General'
                                control={<Radio color="primary" />}
                                label='General' />
                            <FormControlLabel
                                value='Student'
                                control={<Radio color="primary" />}
                                label='Student *' />
                        </RadioGroup>
                    </FormControl>
                    <p id="discount">* $5 off your session with a valid student ID at check-in!</p>
                    <Button className="cancel" varient="raised" onClick={this.cancelClick}>Cancel</Button>
                    <Button className="next" varient="raised" onClick={this.handleClick}>Next</Button>
                </form>
            );
        }
        return (
            <div>
                <Nav history={this.props.history}/>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PersonalInformation);