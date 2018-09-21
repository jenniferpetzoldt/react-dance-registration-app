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
                firstHour: {
                    className: '',
                    cost: '0'
                },
                secondHour: {
                    className: '',
                    cost: '0'
                },
            }
        }
    }


    handleFirstHourChange = (event) => {
        if (this.props.state.userInputReducer.personalInfo.admission === "general") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: {
                        className: event.target.value,
                        cost: '40',
                    },
                }
            });
        } else if (this.props.state.userInputReducer.personalInfo.admission === "student") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: {
                        className: event.target.value,
                        cost: '35',
                    },
                }
            });
        }
    }

    handleSecondHourChange = (event) => {
        this.setState({
            lessons: {
                ...this.state.lessons,
                secondHour: {
                    className: event.target.value,
                    cost: '40',
                },
            }
        });
    }

    addLessons = () => {
        this.props.dispatch({ type: 'ADD_LESSONS', payload: this.state.lessons });
    }

    handleNextClick = (event) => {
        this.addLessons();
        this.props.history.push('/payment');
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <RegistrationTitle />
                    <form>
                        <h3>2. Lessons</h3>
                        <div>
                            <FormControl>
                                <FormLabel>7:00pm - 8:15pm</FormLabel>
                                <RadioGroup
                                    aria-label="7:00pm - 8:15pm"
                                    name="firstHour"
                                    value={this.state.lessons.firstHour.className}
                                    onChange={this.handleFirstHourChange}>
                                    <FormControlLabel
                                        value={this.props.state.registrationReducer[0].level_one}
                                        control={<Radio color="primary" />}
                                        label={this.props.state.registrationReducer[0].level_one} />
                                    <FormControlLabel
                                        value={this.props.state.registrationReducer[0].level_four}
                                        control={<Radio color="primary" />}
                                        label={this.props.state.registrationReducer[0].level_four} />
                                    <FormControlLabel
                                        value={this.props.state.registrationReducer[0].solo_jazz}
                                        control={<Radio color="primary" />}
                                        label={this.props.state.registrationReducer[0].solo_jazz} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <FormLabel>8:30pm - 9:45pm</FormLabel>
                                <RadioGroup
                                    aria-label="8:30pm - 9:45pm"
                                    name="secondHour"
                                    value={this.state.lessons.secondHour.className}
                                    onChange={this.handleSecondHourChange}>
                                    <FormControlLabel
                                        value={this.props.state.registrationReducer[0].level_two}
                                        control={<Radio color="primary" />}
                                        label={this.props.state.registrationReducer[0].level_two} />
                                    <FormControlLabel
                                        value={this.props.state.registrationReducer[0].level_three}
                                        control={<Radio color="primary" />}
                                        label={this.props.state.registrationReducer[0].level_three} />
                                    <FormControlLabel
                                        value={this.props.state.registrationReducer[0].level_five}
                                        control={<Radio color="primary" />}
                                        label={this.props.state.registrationReducer[0].level_five} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Button className="next" varient="raised" onClick={this.handleNextClick}>Next</Button>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Lessons);