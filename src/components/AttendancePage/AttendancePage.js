import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { InputLabel, FormControl, MenuItem, Select, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    formControl: {
        width: 200,
    },
}

// needed for concatinating menu item
const space = " ";

class AttendancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendId: '',
        }
    }
    //retrieves the month options on page load
    componentDidMount() {
        this.getAttendMonths();
    }
    // retireves the month and year to populate the select
    getAttendMonths = () => {
        axios({
            method: 'GET',
            url: 'api/attendance'
        }).then((response) => {
            const attendMonths = response.data;
            // sends redux with the month and year of the sessions
            const action = { type: 'UPDATE_ATTEND_MONTHS', payload: attendMonths };
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('GET attend error', error);
            alert('Unable to get attend');
        })
    }
    // retrieves the form data and registrations associated with the specific form id
    getSpecificAttendanceData = () => {
        const id = this.state.attendId;
        axios({
            method: 'GET',
            url: '/api/attendance/' + id
        }).then((response) => {
            const selectedAttendance = response.data;
            // sends all the registrations for the selected session's attendnace to redux
            const action = {type: 'SET_ATTENDANCE_DATA', payload: selectedAttendance};
            this.props.dispatch(action);
            this.props.history.push('/checkin')
        }).catch((error) => {
            console.log('GET specific attendance ERROR', error);
            alert('Unable to get specific attendnace');
        })
    }

    //sets the form id in local state
    handleChange = (event) => {
        this.setState({
            attendId: event.target.value,
        });
    }
    // dispatches form id and calls for the attendance data
    handleClick = (event) => {
        this.props.dispatch({ type: 'ADD_ATTEND_MONTH_ID', payload: this.state })
        this.getSpecificAttendanceData();
    }

    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === true) {
            content = (
                <form id="attendanceSelect">
                    <FormControl style={styles.formControl}>
                        <InputLabel htmlFor="attendSelect">Select Month</InputLabel>
                        <Select inputProps={{ name: 'attendSelect', id: "formSelect" }}
                            value={this.state.attendId}
                            onChange={this.handleChange}>
                            {this.props.state.attend.map((attendMonth, i) => {
                                return (<MenuItem key={i} value={attendMonth.id}>{attendMonth.form_month + space + attendMonth.form_year}</MenuItem>)
                            })}</Select>
                    </FormControl>
                    <br />
                    {/* create Button component */}
                    <Button className="next" varient="raised" onClick={this.handleClick}>Select</Button>
                </form>
            );
        }
        return (
            <div>
                <Nav history={this.props.history}/>
                {content}
            </div>

        )
    }
}

export default connect(mapStateToProps)(AttendancePage);