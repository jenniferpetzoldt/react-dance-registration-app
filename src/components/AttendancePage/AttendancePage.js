import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import AddDancer from '../AddDancer/AddDancer';
import AttendanceTable from '../AttendanceTable/AttendanceTable';
// import {Select, Button, TextField, Table,  } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

// needed for concatinating menu item
const space = " ";

class AttendancePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attendId: '',
        }
    }

    componentDidMount(){
        
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <form>
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
                    </form>
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