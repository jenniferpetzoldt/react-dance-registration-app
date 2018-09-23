import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class AttendanceTableHead extends Component {
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Admission</TableCell>
                            <TableCell>First Class</TableCell>
                            <TableCell>Second Class</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Owed</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Week 1</TableCell>
                            <TableCell>Week 2</TableCell>
                            <TableCell>Week 3</TableCell>
                            <TableCell>Week 4</TableCell>
                            <TableCell>Notes</TableCell>
                        </TableRow>
                    </TableHead>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
export default connect(mapStateToProps)(AttendanceTableHead);