import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { InputLabel, FormControl, MenuItem, Select, TextField, Button } from '@material-ui/core';


const mapStateToProps = state => ({
    user: state.user,
    state,
});

const space = " ";

const styles = {
    formControl: {
      display: 'flex',
    },
  }

class ClassNameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            selectedMonth: '',
            selectedYear: '',
            newForm: {
                startDate: '',
                month: '',
                year: '',
                levelOne: '',
                levelFour: '',
                soloJazz: '',
                levelTwo: '',
                levelThree: '',
                levelFive: '',
            },
        }
    }

    createDate = event => {
        event.preventDefault();
        const selectedMonth = this.state.selectedMonth;
        const selectedYear = this.state.selectedYear;
        const wholeDate = selectedMonth + space + '1,' + space + selectedYear;
        this.setState({
            newForm: {
                ...this.state.newForm,
                startDate: wholeDate,
            }
        });
    }

    handleMonthChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                month: event.target.value,
            },
            selectedMonth: event.target.value,
        });
    }

    handleYearChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                year: event.target.value,
            },
            selectedYear: event.target.value,
        });
    }

    handleChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                [event.target.name]: event.target.value,
            },
        });
    }

    addNewForm = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_FORM', payload: this.state.newForm });
        event.target.reset();
        axios({
            method: 'POST',
            url: '/api/form',
            data: { newForm: this.state.newForm }
        }).then((response) => {
            console.log('Success with form POST');
            this.props.dispatch({ type: 'CLEAR_FORM' });
        }).catch((error) => {
            console.log('Post error', error);
            alert('Unable to add form');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <form>
                            <h2>Create a new class session:</h2>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="monthSelect">Select Month</InputLabel>
                            <Select 
                            inputProps={{ name: 'monthSelect', id: "monthSelect" }}
                            onChange={this.handleMonthChange} 
                            value={this.state.newForm.month}>
                                {this.state.months.map((month, i) => {
                                    return <MenuItem key={i} value={month}>{month}</MenuItem>
                                })}
                            </Select>
                            </FormControl>
                            <FormControl style={styles.formControl}>
                            <InputLabel htmlFor= "yearSelect">Select Year</InputLabel>
                            <Select 
                            inputProps={{ name: 'yearSelect', id: "yearSelect" }}
                            onChange={this.handleYearChange} 
                            value={this.state.newForm.year}>
                                {this.state.years.map((year, i) => {
                                    return <MenuItem key={i} value={year}>{year}</MenuItem>
                                })}
                            </Select>
                            <Button className="next" varient="raised" onClick={this.createDate}>Next</Button>
                        </FormControl>
                    </form>
                    <form>
                        <h2>Class Names:</h2>
                        <p>Input class names including level below:</p>
                        <div>
                            <h3>07:00pm</h3>
                            <TextField 
                            label="Level 1"
                            name="levelOne" 
                            value="Level 1"
                            onChange={this.handleChange} />
                            <TextField 
                            label="Level 4"
                            name="levelFour"
                            value="Level 4" 
                            onChange={this.handleChange} />
                            <TextField 
                            label="Solo Jazz"
                            name="soloJazz" 
                            value="Solo Jazz"
                            onChange={this.handleChange} />
                            <h3>08:30pm</h3>
                            <TextField 
                            label="Level 2"
                            name="levelTwo"
                            value="Level 2" 
                            onChange={this.handleChange} />
                            <TextField 
                            label="Level 3"
                            name="levelThree"
                            value="Level 3" 
                            onChange={this.handleChange} />
                            <TextField 
                            label="Level 5"
                            name="levelFive"
                            value="Level 5" 
                            onChange={this.handleChange} />
                            <Button className="submit" varient="raised" onClick={this.addNewForm}>Submit</Button>
                        {/* add another button to send back to add another month's classes */}
                        </div>
                    </form>
                </div >
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClassNameInput);