import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import AddDancerButton from '../AddDancerButton/AddDancerButton';
import AttendanceTitle from '../AttendanceTitle/AttendanceTitle';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Paper } from '@material-ui/core';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class AttendanceTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrations: [],
            attendId: this.props.state.adminInput.attendId,
        }
    }

    componentDidMount() {
        this.getRegistrations();
    }

    getRegistrations = () => {
        axios({
            method: 'GET',
            url: '/api/registration/' + this.state.attendId
        }).then((response) => {
            this.setState({ registrations: response.data, });
        }).catch((error) => {
            console.log('Registrations GET error', error);
            alert('Unable to GET registrations');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <AttendanceTitle />
                    <AddDancerButton />
                    <Paper>
                        <Table id="attendanceTable">
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
                            <TableBody>
                                {this.state.registrations.map((registration, i) => {
                                    return <TableRow key={i} value={registration}>
                                        <TableCell>{registration.first_name}</TableCell>
                                        <TableCell>{registration.last_name}</TableCell>
                                        <TableCell>{registration.dancer_role}</TableCell>
                                        <TableCell>{registration.admission}</TableCell>
                                        <TableCell>{registration.first_hour}</TableCell>
                                        <TableCell>{registration.second_hour}</TableCell>
                                        <TableCell>{registration.paid}</TableCell>
                                        <TableCell>{registration.oweds}</TableCell>
                                        <TableCell>{registration.payment_type}</TableCell>
                                        <TableCell>{registration.week_one}</TableCell>
                                        <TableCell>{registration.week_two}</TableCell>
                                        <TableCell>{registration.week_three}</TableCell>
                                        <TableCell>{registration.week_four}</TableCell>
                                        <TableCell>notes</TableCell>
                                        <TableCell>
                                            <Button>Delete</Button>
                                            <Button>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AttendanceTable);