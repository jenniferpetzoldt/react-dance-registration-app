import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, FormLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class AddDancer extends Component {
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
                firstHour: '',
                secondHour: '',
            }
        }
    }
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <Button>Add Dancer</Button>
                    </div>
                    <div>
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
                            <br />
                            <FormControl>
                                <FormLabel>7:00pm - 8:15pm</FormLabel>
                                <RadioGroup
                                    aria-label="7:00pm - 8:15pm"
                                    name="firstHour"
                                    value={this.state.personalInformation.firstHour.className}
                                    onChange={this.handleFirstHourChange}>
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
                                <FormLabel>8:30pm - 9:45pm</FormLabel>
                                <RadioGroup
                                    aria-label="8:30pm - 9:45pm"
                                    name="secondHour"
                                    value={this.state.personalInformation.secondHour.className}
                                    onChange={this.handleSecondHourChange}>
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
                            <br />
                            <Button>Add</Button>
                            <Button>Cancel</Button>
                        </form>
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

export default connect(mapStateToProps)(AddDancer);