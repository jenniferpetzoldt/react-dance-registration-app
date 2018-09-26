import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import AddDancerButton from '../AddDancerButton/AddDancerButton';
import AttendanceTitle from '../AttendanceTitle/AttendanceTitle';
import UpdateDancerModal from '../UpdateDancerModal/UpdateDancerModal';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog } from '@material-ui/core';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    textField: {
        width: 55,
    }
  }

class AttendanceTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            registrationId: '',
            registrations: this.props.state.attenTableData,
            attendId: this.props.state.adminInput.attendId,
            attendance: {
                wk1: '',
                wk2: '',
                wk3: '',
                wk4: '',
            }
        }
    }
    // retrieves registration information on page load
    componentDidMount() {
        this.getRegistrations();

    }

    handleUpdateClick(id){
        this.setState({
            open: true,
            registrationId: id,
        });
    }

    //retrieves registration information associated with specific form id
    getRegistrations = () => {
        axios({
            method: 'GET',
            url: '/api/registration/' + this.state.attendId
        }).then((response) => {
            const registrations = response.data;
            const action = { type: 'ADD_ATTEND_DATA', payload: registrations };
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('Registrations GET error', error);
            alert('Unable to GET registrations');
        })
    }
    // deletes registration based on id 
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
    //updates the attendance information
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
                                {this.props.state.attenTableData.map((registration) => {
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
                                        {/* add a model that pops up with that registrations information to edit the attendance and submit the update*/}
                                        <TableCell>{registration.week_one}</TableCell>
                                        <TableCell>{registration.week_two}</TableCell>
                                        <TableCell>{registration.week_three}</TableCell>
                                        <TableCell>{registration.week_four}</TableCell>
                                        <TableCell>
                                            <Button className="delete" varient="raised" 
                                                    onClick={() => this.deleteRegistration(registration.id)}>Delete</Button>
                                            <Button className="update" varient="raised" 
                                                    onClick={() => this.handleUpdateClick(registration.id)}>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <Dialog 
                        open={this.state.open}>
                        <UpdateDancerModal registrationId={this.state.registrationId}/>
                    </Dialog>
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