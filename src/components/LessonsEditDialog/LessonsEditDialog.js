import React, { Component } from 'react';
import { connect } from 'react-redux';
import Confirm from '../Confirm/Confirm';

import { FormControl, Radio, Dialog, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';
const mapStateToProps = state => ({
    user: state.user,
    state,
});

class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
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

    UpdateRegistraiton = () => {
        this.props.dispatch({ type: 'ADD_FIRST_HOUR', payload: this.state.lessons.firstHour });
        this.props.dispatch({ type: 'ADD_SECOND_HOUR', payload: this.state.lessons.secondHour });
        this.calculateTotal();
        this.setState({
            open: true,
        })
    }
//found bug! if they previously have not selected a class it does not calculate right and they can not fully unselect an hour!!!
    handleFirstHourChange = (event) => {
        if (this.props.state.userInput.userInfo.admission === "general") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    firstHour: {
                        className: event.target.value,
                        cost: '40',
                    },
                }
            });
        } else if (this.props.state.userInput.userInfo.admission === "student") {
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
        if (this.props.state.userInput.userInfo.admission === "general") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: {
                        className: event.target.value,
                        cost: '40',
                    },
                }
            });
        } else if (this.props.state.userInput.userInfo.admission === "student") {
            this.setState({
                lessons: {
                    ...this.state.lessons,
                    secondHour: {
                        className: event.target.value,
                        cost: '35',
                    },
                }
            });
        }
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <h1>Edit Lesson Selection</h1>
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
                        <Button  className="edit" varient="raised" onClick={this.UpdateRegistraiton}>Edit</Button>
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