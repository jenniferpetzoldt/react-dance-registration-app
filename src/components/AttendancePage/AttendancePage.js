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

class AttendancePage extends Component {
    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <select></select>
                    </div>
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