import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
    state,
});

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
        const wholeDate = selectedMonth + ' ' + '1' + ' ' + selectedYear;
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
        return (
            <div>
                <form onSubmit={this.createDate}>
                    <div>
                        <select name="month" onChange={this.handleMonthChange} value={this.state.value}>
                            <option value="">Select Month</option>
                            {this.state.months.map((month, i) => {
                                return <option key={i} value={month}>{month}</option>
                            })}
                        </select>
                        <select name="year" onChange={this.handleYearChange} value={this.state.value}>
                            <option value="">Select Year</option>
                            {this.state.years.map((year, i) => {
                                return <option key={i} value={year}>{year}</option>
                            })}
                        </select>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <form onSubmit={this.addNewForm}>
                    <h2>Lessons</h2>
                    <div>
                        <h3>07:00pm</h3>
                        <label>Level 1</label>
                        <input name="levelOne" onChange={this.handleChange} />
                        <label>Level 4</label>
                        <input name="levelFour" onChange={this.handleChange} />
                        <label>Solo Jazz</label>
                        <input name="soloJazz" onChange={this.handleChange} />
                        <h3>08:30pm</h3>
                        <label>Level 2</label>
                        <input name="levelTwo" onChange={this.handleChange} />
                        <label>Level 3</label>
                        <input name="levelThree" onChange={this.handleChange} />
                        <label>Level 5</label>
                        <input name="levelFive" onChange={this.handleChange} />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div >
        )
    }
}

export default connect(mapStateToProps)(ClassNameInput);