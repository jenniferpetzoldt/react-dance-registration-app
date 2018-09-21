import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import AddDancer from '../AddDancer/AddDancer';
import AttendanceTable from '../AttendanceTable/AttendanceTable';
import axios from 'axios';
import { InputLabel, FormControl, FormHelperText, MenuItem, Select, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    formControl: {
      display: 'flex',
      flexWrap: 'wrap',
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

    // componentDidMount(){
    //     this.getAttendMonths();
    // }

    getAttendMonths = () => {
        axios({
            method: 'GET',
            url: 'api/attendance'
        }).then((response) => {
            console.log('GET attend months:', response.data);
            const attendMonths = response.data;
            const action = { type: 'UPDATE_ATTEND_MONTHS', payload: attendMonths};
            this.props.dispatch(action);
        }).catch((error)=>{
            console.log('GET attend error', error);
            alert('Unable to get attend');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    {/* <form>
                        <FormControl style={styles.formControl}>
                            <InputLabel htmlFor="attendSelect">Select Month</InputLabel>
                            <Select
                                inputProps={{ name: 'attendSelect', id: "attendSelect" }}
                                value={this.state.attendId}
                                onChange={this.handleChange}>
                                {this.props.state.attend.map((attendMonth, i) => {
                                    return (<MenuItem key={i} value={attendMonth.id}>{attendMonth.form_month + space + attendMonth.form_year}</MenuItem>)
                                })}
                            </Select>
                            <FormHelperText>Select Registration Month</FormHelperText>
                        </FormControl>
                        <Button className="next" varient="raised" onClick={this.handleClick}>Next</Button>
                    </form> */}
                    <div>
                        <AddDancer />
                    </div>
                    <div>
                        <AttendanceTable />
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Nav />
                {content}
            </div>

        )
    }
}

export default connect(mapStateToProps)(AttendancePage);