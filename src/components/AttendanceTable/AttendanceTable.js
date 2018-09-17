import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class AttendanceTable extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Admission</th>
                        <th>First Class</th>
                        <th>Second Class</th>
                        <th>Paid</th>
                        <th>Owed</th>
                        <th>Payment Method</th>
                        <th>Week 1</th>
                        <th>Week 2</th>
                        <th>Week 3</th>
                        <th>Week 4</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
        )
    }
}

export default connect(mapStateToProps)(AttendanceTable);