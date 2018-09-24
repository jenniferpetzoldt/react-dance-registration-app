import React, { Component } from 'react';
import { connect } from 'react-redux';
import Confirm from '../Confirm/Confirm';
import { FormControl, Radio, TextField, FormLabel, RadioGroup, FormControlLabel, Button, Dialog } from '@material-ui/core';

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
                firstName: this.props.state.userInput.userInfo.firstName,
                lastName: this.props.state.userInput.userInfo.lastName,
                email: this.props.state.userInput.userInfo.email,
                role: this.props.state.userInput.userInfo.role,
                admission: this.props.state.userInput.userInfo.admission,
            },
            lessons: {
                firstHour: {
                    className: this.props.state.userInput.firstHour.className,
                    cost: this.props.state.userInput.firstHour.cost
                },
                secondHour: {
                    className: this.props.state.userInput.secondHour.className,
                    cost: this.props.state.userInput.secondHour.cost
                },
            },
        }
    }

    calculateTotal = () => {
        const firstHourCost = Number(this.state.lessons.firstHour.cost);
        const secondHourCost = Number(this.state.lessons.secondHour.cost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);
        this.props.dispatch({ type: 'ADD_TOTAL', payload: stringTotal });
        console.log('in calculateTotal in edit', stringTotal);
    }


    handlePersonalInformationChange = (event) => {
        this.setState({
            personalInformation: {
                ...this.state.personalInformation,
                [event.target.name]: event.target.value,
            },
        });
    }

    handleAdmissionChange = (event) => {
        if (this.state.personalInformation.admission === "general" && this.state.lessons.firstHour.cost === "35") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: {
                        ...this.state.lessons.firstHour,
                        cost: '40',
                    },
                }
            });
        } else if (this.state.personalInformation.admission === "general" && this.state.lessons.secondHour.cost === "35") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: {
                       ...this.state.lessons.secondHour,
                        cost: '40',
                    },
                }
            });
        } else if (this.state.personalInformation.admission === "student" && this.state.lessons.firstHour.cost === "40") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: {
                       ...this.state.lessons.secondHour,
                        cost: '35',
                    },
                }
            });
        } else if (this.state.personalInformation.admission === "student" && this.state.lessons.secondHour.cost === "40") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: {
                       ...this.state.lessons.secondHour,
                        cost: '35',
                    },
                }
            });
        }
    }

    handleFirstHourChange = (event) => {
       this.setState({
           lessons: {
               ...this.state.lessons,
               firstHour: {
                   ...this.state.lessons.firsthour,
                   className: event.target.value,
               }
           }
       })
    }

    handleSecondHourChange = (event) => {
        this.setState({
            lessons: {
                ...this.state.lessons,
                secondHour: {
                    ...this.state.lessons.secondhour,
                    className: event.target.value,
                }
            }
        })
    }

    UpdateRegistraiton = () => {
        this.handleAdmissionChange();
        console.log('updateRegistration Admission:', this.state.personalInformation.admission);
        this.props.dispatch({ type: 'ADD_PERSONAL_INFO', payload: this.state.personalInformation });
        this.props.dispatch({ type: 'ADD_FIRST_HOUR', payload: this.state.lessons.firstHour });
        this.props.dispatch({ type: 'ADD_SECOND_HOUR', payload: this.state.lessons.secondHour });
        this.calculateTotal();
        this.setState({
            open: true,
        });
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
                                value={this.state.lessons.firstHour.className}
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
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>8:30pm - 9:45pm</FormLabel>
                            <RadioGroup
                                aria-label="8:30pm - 9:45pm"
                                name="secondHour"
                                value={this.state.lessons.secondHour.className}
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
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <Button onClick={this.UpdateRegistraiton}>Save</Button>
                        <Button onClick={this.props.closeClick}>Close</Button>
                        <Dialog
                            open={this.state.open}>
                            <Confirm />
                        </Dialog>
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