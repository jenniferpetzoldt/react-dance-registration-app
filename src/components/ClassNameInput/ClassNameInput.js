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
            newForm: {
                startDate: '',
                levelOne: '',
                levelFour: '',
                soloJazz: '',
                levelTwo: '',
                levelThree: '',
                levelFive: '',
            },
            selectedMonth: '',
            selectedYear: '',
        }
    }

    createDate = () => {
        const selectedMonth = this.state.selectedMonth;
        const selectedYear = this.state.selectedYear;
        let wholeDate = selectedMonth +' ' + '1' +' '+ selectedYear;
        this.setState = ({
            newForm: {
                ...this.state.newForm,
                startDate: wholeDate,
            }
        })
        console.log('wholeDate', wholeDate);
        
    }

    handleMonthChange = (event) => {
        this.setState({
            selectedMonth: event.target.value,
        })
    }

    handleYearChange = (event) => {
        this.setState({
            selectedYear: event.target.value,
        })
    }

    handleChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                [event.target.name]: event.target.value,
            },
        })
    }
 // newForm.startDate is not setting in state
    addNewForm = event => {
        event.preventDefault();
        this.createDate();
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

            <form onSubmit={this.addNewForm}>
                <div>
                    {JSON.stringify(this.state.selectedMonth)}
                    {JSON.stringify(this.state.selectedYear)}
                    <select onChange={this.handleMonthChange} value={this.state.selectedMonth}>
                        <option value="">Select Month</option>
                        {this.state.months.map((month, i) => {
                            return <option key={i} value={month}>{month}</option>
                        })}
                    </select>
                    <select onChange={this.handleYearChange} value={this.state.selectedYear}>
                        <option value="">Select Year</option>
                        {this.state.years.map((year, i) => {
                            return <option key={i} value={year}>{year}</option>
                        })}
                    </select>

                </div>
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
        )
    }
}

export default connect(mapStateToProps)(ClassNameInput);