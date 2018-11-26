import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import { FormLabel, FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';


const mapStateToProps = state => ({
    user: state.user,
    state,
});

class Lessons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: {
                firstHour: '',
                firstHourCost: '0',
                secondHour: '',
                secondHourCost: '0',
            },
        }
    }
    //calculates total cost, and reconverts the numbers to a string to send to redux
    calculateTotal = () => {
        const firstHourCost = Number(this.state.lessons.firstHourCost);
        const secondHourCost = Number(this.state.lessons.secondHourCost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);
        this.props.dispatch({ type: 'ADD_TOTAL', payload: stringTotal });
    }
    //updates state if first hour class selection is changed
    handleFirstHourChange = (event) => {
        if (this.props.state.userInput.personalInfo.admission === "General") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: event.target.value,
                    firstHourCost: '40',
                }
            })
        } 
        if (this.props.state.userInput.personalInfo.admission === "Student") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: event.target.value,
                    firstHourCost: '35',
                }
            })
        }
    }
    //updates state if second hour class selection is changed
    handleSecondHourChange = (event) => {
        if (this.props.state.userInput.personalInfo.admission === "General") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: event.target.value,
                    secondHourCost: '40',
                }
            });
        } else if (this.props.state.userInput.personalInfo.admission === "Student") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: event.target.value,
                    secondHourCost: '35',
                }
            });
        }
    }

    // adds lessons to redux and recalculates total
    addLessons = () => {
        this.props.dispatch({ type: 'ADD_LESSONS', payload: this.state.lessons });
        this.calculateTotal();
    }

    // cancels registration and returns user to main registration page
    cancelClick = (event) => {
        this.props.history.push('/registration');
    }

    // dispatcches lesson selection to redux and sends user to next view
    handleNextClick = (event) => {
        this.addLessons();
        this.props.history.push('/payment');
    }

    render() {
        let content = null;
        if (this.props.user.userName && this.props.user.admin === false) {
            content = (
                <div>
                    <RegistrationTitle />
                    <form id="lessonsForm">
                        <h3>Lessons</h3>
                        <div>
                            <p id="admissionComment">General Admission is $40 OR with Student ID $35 </p>
                            <FormControl id="roleRadio">
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
                        </div>
                        <Button className="cancel" varient="raised" onClick={this.cancelClick}>Cancel</Button>
                        <Button className="next" varient="raised" onClick={this.handleNextClick}>Next</Button>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <Nav history={this.props.history}/>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Lessons);