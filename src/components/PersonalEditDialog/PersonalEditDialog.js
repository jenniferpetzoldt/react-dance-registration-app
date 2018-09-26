import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, Radio, TextField, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalInformation: {
                userId: this.props.state.userInput.personalInfo.userId,
                firstName: this.props.state.userInput.personalInfo.firstName,
                lastName: this.props.state.userInput.personalInfo.lastName,
                email: this.props.state.userInput.personalInfo.email,
                role: this.props.state.userInput.personalInfo.role,
                admission: this.props.state.userInput.personalInfo.admission,
            },
            lessons: {
                firstHour: this.props.state.userInput.lessons.firstHour,
                firstHourCost: this.props.state.userInput.lessons.firstHourCost,
                secondHour: this.props.state.userInput.lessons.secondHour,
                secondHourCost: this.props.state.userInput.lessons.secondHourCost,
            },
        }
    }

    componentWillUnmount() {
        this.updateRegistraiton();
    }

    handleAdmissionChange = (event) => {
        console.log('in handleAdmissionChange', this.state.personalInformation.admission);
        const studentDiscount = '35';
        const general = '40';
        if (this.state.personalInformation.admission === "student") {
            let firstHourCost = this.state.lessons.firstHourCost;
            if (firstHourCost !== '0') {
                firstHourCost = studentDiscount
            } 
            let secondHourCost = this.state.lessons.secondHourCost;
            if (secondHourCost !== '0') {
                secondHourCost = studentDiscount
            }
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHourCost: firstHourCost,
                    secondHourCost: secondHourCost,
                }
            })
        } else {
            let firstHourCost = this.state.lessons.firstHourCost;
            if (firstHourCost !== '0') {
                firstHourCost = general
            }
            let secondHourCost = this.state.lessons.secondHourCost;
            if (secondHourCost !== '0') {
                secondHourCost = general
            }
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHourCost: firstHourCost,
                    secondHourCost: secondHourCost,
                }
            })
        };
        this.props.closeClick();
    }

    handlePersonalInformationChange = (event) => {
        this.setState({
            personalInformation: {
                ...this.state.personalInformation,
                [event.target.name]: event.target.value,
            },
        });
    }

    handleFirstHourChange = (event) => {
        if (this.state.personalInformation.admission === "general") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: event.target.value,
                    firstHourCost: '40',
                }
            });
        } else if (this.state.personalInformation.admission === "student") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: event.target.value,
                    firstHourCost: '35',
                }
            });
        } 
    }

    handleSecondHourChange = (event) => {
        if (this.state.personalInformation.admission === "general") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: event.target.value,
                    secondHourCost: '40',
                }
            });
        } else if (this.state.personalInformation.admission === "student") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: event.target.value,
                    secondHourCost: '35',
                }
            });
        } else {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: '',
                    secondHourCost: '35',
                }
            });
        }
    }

    updateRegistraiton = () => {
        console.log('in updateRegistration', this.state.lessons);
        this.props.dispatch({ type: 'ADD_PERSONAL_INFO', payload: this.state.personalInformation });
        this.props.dispatch({ type: 'ADD_LESSONS', payload: this.state.lessons });
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <h1>Edit Personal Information</h1>
                        <h3>PersonalInformation:</h3>
                        <FormControl>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={this.state.personalInformation.firstName}
                                onChange={this.handlePersonalInformationChange} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={this.state.personalInformation.lastName}
                                onChange={this.handlePersonalInformationChange} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <TextField
                                label="Email Address"
                                name="email"
                                value={this.state.personalInformation.email}
                                onChange={this.handlePersonalInformationChange} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <RadioGroup
                                name="role"
                                value={this.state.personalInformation.role}
                                onChange={this.handlePersonalInformationChange}>
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
                                value={this.state.personalInformation.admission}
                                onChange={this.handlePersonalInformationChange}>
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
                            <FormLabel>7:00pm - 8:15pm</FormLabel>
                            <RadioGroup
                                aria-label="7:00pm - 8:15pm"
                                name="firstHour"
                                value={this.state.lessons.firstHour}
                                onChange={this.handleFirstHourChange}>
                                <FormControlLabel
                                    value={this.props.state.form[0].level_one}
                                    control={<Radio color="primary" />}
                                    label={this.props.state.form[0].level_one} />
                                <FormControlLabel
                                    value={this.props.state.form[0].level_four}
                                    control={<Radio color="primary" />}
                                    label={this.props.state.form[0].level_four} />
                                <FormControlLabel
                                    value={this.props.state.form[0].solo_jazz}
                                    control={<Radio color="primary" />}
                                    label={this.props.state.form[0].solo_jazz} />
                                <FormControlLabel
                                    value=''
                                    control={<Radio color="primary" />}
                                    label="None" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>8:30pm - 9:45pm</FormLabel>
                            <RadioGroup
                                aria-label="8:30pm - 9:45pm"
                                name="secondHour"
                                value={this.state.lessons.secondHour}
                                onChange={this.handleSecondHourChange}>
                                <FormControlLabel
                                    value={this.props.state.form[0].level_two}
                                    control={<Radio color="primary" />}
                                    label={this.props.state.form[0].level_two} />
                                <FormControlLabel
                                    value={this.props.state.form[0].level_three}
                                    control={<Radio color="primary" />}
                                    label={this.props.state.form[0].level_three} />
                                <FormControlLabel
                                    value={this.props.state.form[0].level_five}
                                    control={<Radio color="primary" />}
                                    label={this.props.state.form[0].level_five} />
                                <FormControlLabel
                                    value=''
                                    control={<Radio color="primary" />}
                                    label="None" />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <Button className="submit" varient="raised" onClick={this.handleAdmissionChange}>Save</Button>
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