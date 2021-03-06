import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import FormTable from '../FormTable/FormTable';
import { InputLabel, FormControl, MenuItem, Select, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const space = " ";

const styles = {
    formControl: {
        width: 150,
        marginRight: 20,
        marginBottom: 10,
    },
}

class CreateFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            years: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            selectedMonth: '',
            selectedYear: '',
        }
    }
   
    //updates state with the month selected in the drop down
    handleMonthChange = (event) => {
        this.setState({
            selectedMonth: event.target.value,
        });
    }

    //updates state with the month selected in the drop down
    handleYearChange = (event) => {
        this.setState({
            selectedYear: event.target.value,
        });
    }

    //javascript date class
    createDate = () => {
        const selectedMonth = this.state.selectedMonth;
        const selectedYear = this.state.selectedYear;
        const wholeDate = selectedMonth + space + '1,' + space + selectedYear;
        this.props.dispatch({ type: 'ADD_WHOLE_DATE', payload: wholeDate });
        this.props.dispatch({ type: 'ADD_MONTH', payload: this.state.selectedMonth });
        this.props.dispatch({ type: 'ADD_YEAR', payload: this.state.selectedYear });
    }

    //call s the createDate function and pushes to the next view
    handleClick = (event) => {
        this.createDate();
        this.props.history.push('/classnames');
    }

    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === true) {
            content = (
                <div>
                    <form id="createForm">
                        <h3>Create a new class session:</h3>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="monthSelect">Select Month</InputLabel>
                            <Select
                                inputProps={{ name: 'monthSelect', id: "monthSelect" }}
                                onChange={this.handleMonthChange}
                                value={this.state.selectedMonth}>
                                {this.state.months.map((month, i) => {
                                    return <MenuItem key={i} value={month}>{month}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="yearSelect">Select Year</InputLabel>
                            <Select
                                inputProps={{ name: 'yearSelect', id: "yearSelect" }}
                                onChange={this.handleYearChange}
                                value={this.state.selectedYear}>
                                {this.state.years.map((year, i) => {
                                    return <MenuItem key={i} value={year}>{year}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <br />
                        <Button className="next" varient="raised" onClick={this.handleClick}>Next</Button>
                    </form>
                    <FormTable />
                </div>
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

export default connect(mapStateToProps)(CreateFormPage);