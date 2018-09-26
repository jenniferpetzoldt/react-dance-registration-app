import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import AddDancerButton from '../AddDancerButton/AddDancerButton';
import AttendanceTitle from '../AttendanceTitle/AttendanceTitle';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@material-ui/core';
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

    deleteRegistration = (id) => {
        console.log('Delete registration', id);
        axios({
            method: 'DELETE',
            url: '/api/registration/' + id
        }).then((response) => {
            this.getRegistrations();
        }).catch((error) => {
            console.log('Registration DELETE error', error);
            alert('Unable to DELETE registration');
        })
    }

    updateAttendance = (id) => {
        console.log('Update registration', id);
        axios({
            method: 'UPDATE',
            url: '/api/registration/' + id
        }).then((response) => {
            this.getRegistrations();
        }).catch((error) => {
            console.log('Update registration error', error);
            alert('Unable to UPDATE registration');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <AttendanceTitle />
                    <AddDancerButton />
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Admission</TableCell>
                                    <TableCell>First Class</TableCell>
                                    <TableCell>Second Class</TableCell>
                                    <TableCell>Owed</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell>Week 1</TableCell>
                                    <TableCell>Week 2</TableCell>
                                    <TableCell>Week 3</TableCell>
                                    <TableCell>Week 4</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.registrations.map((registration) => {
                                    return <TableRow key={registration.id} value={registration}>
                                        <TableCell>{registration.first_name}</TableCell>
                                        <TableCell>{registration.last_name}</TableCell>
                                        <TableCell>{registration.dancer_role}</TableCell>
                                        <TableCell>{registration.admission}</TableCell>
                                        <TableCell>{registration.first_hour}</TableCell>
                                        <TableCell>{registration.second_hour}</TableCell>
                                        <TableCell>{registration.oweds}</TableCell>
                                        <TableCell>{registration.payment_type}</TableCell>
                                        {/* Add function to update the registration */}
                                        <TableCell>
                                            <TextField onChange={() => this.updateAttendance(registration.id)}>
                                                {registration.week_one}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField onChange={() => this.updateAttendance(registration.id)}>
                                                {registration.week_two}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField onChange={() => this.updateAttendance(registration.id)}>
                                                {registration.week_three}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField onChange={() => this.updateAttendance(registration.id)}>
                                                {registration.week_four}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <Button className="delete" varient="raised" onClick={() => this.deleteRegistration(registration.id)}>Delete</Button>
                                            <Button className="update" varient="raised" onClick={() => this.handleUpdateClick(registration.id)}>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </div>
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