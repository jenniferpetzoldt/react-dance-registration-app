import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import AddDancerButton from '../AddDancerButton/AddDancerButton';
import AttendanceTitle from '../AttendanceTitle/AttendanceTitle';
import UpdateWeekOne from '../UpdateWeekOne/UpdateWeekOne';
import UpdateWeekTwo from '../UpdateWeekTwo/UpdateWeekTwo';
import UpdateWeekThree from '../UpdateWeekThree/UpdateWeekThree';
import UpdateWeekFour from '../UpdateWeekFour/UpdateWeekFour';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    textField: {
        width: 55,
    },
}

class AttendanceTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            twoOpen: false,
            threeOpen: false,
            fourOpen: false,
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
    // find better way to manage the modals
    // the following functions manage the opening and closing of the different week dialogs and updates redux
    handleOneClick = (id) => {
        this.props.dispatch({ type: 'ADD_ID_TO_UPDATE', payload: id });
        this.openOne();
    }
    openOne = () => {
        this.setState({
            open: true,
        });
    }

    closeOne = (event) => {
        this.setState({
            open: false,
        });
    }

    // functions for week 2 dialog
    handleTwoClick = (id) => {
        this.props.dispatch({ type: 'ADD_ID_TO_UPDATE', payload: id });
        this.openTwo();
    }

    openTwo = () => {
        this.setState({
            twoOpen: true,
        });
    }

    closeTwo = (event) => {
        this.setState({
            twoOpen: false,
        });
    }

    //functions for week 3 dialog
    handleThreeClick = (id) => {
        this.props.dispatch({ type: 'ADD_ID_TO_UPDATE', payload: id });
        this.openThree();
    }

    openThree = () => {
        this.setState({
            threeOpen: true,
        });
    }
    closeThree = (event) => {
        this.setState({
            threeOpen: false,
        });
    }

    //functions for week 4 dialog
    handleFourClick = (id) => {
        this.props.dispatch({ type: 'ADD_ID_TO_UPDATE', payload: id });
        this.openFour();
    }

    openFour = () => {
        this.setState({
            fourOpen: true,

        });
    }

    closeFour = (event) => {
        this.setState({
            fourOpen: false,
        });
    }

    //retrieves registration information associated with specific form id
    getRegistrations = () => {
        const id = this.state.attendId;
        axios({
            method: 'GET',
            url: '/api/registration/' + id
        }).then((response) => {
            const registrations = response.data;
            // sends registration data to redux
            const action = { type: 'ADD_ATTEND_DATA', payload: registrations };
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('Registrations GET error', error);
            alert('Unable to GET registrations');
        })
    }
    // deletes registration based on id 
    deleteRegistration = (id) => {
        axios({
            method: 'DELETE',
            url: '/api/registration/' + id
        }).then((response) => {
            //updates table data with most resent updates
            this.getRegistrations();
        }).catch((error) => {
            console.log('Registration DELETE error', error);
            alert('Unable to DELETE registration');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === true) {
            content = (
                <div>
                    <AttendanceTitle />
                    <AddDancerButton />
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow className="attendanceTable">
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Admission</TableCell>
                                    <TableCell>First Class</TableCell>
                                    <TableCell>Second Class</TableCell>
                                    {/* <TableCell style={styles.narrowCell}>Owed</TableCell>  will need this row as app is built out*/}
                                    {/* <TableCell>Payment Method</TableCell> will need this row as app is built out */}
                                    <TableCell>Week 1</TableCell>
                                    <TableCell>Week 2</TableCell>
                                    <TableCell>Week 3</TableCell>
                                    <TableCell>Week 4</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.state.attenTableData.map((registration) => {
                                    return <TableRow className="attendanceTable" key={registration.id} value={registration}>
                                        <TableCell>{registration.first_name}</TableCell>
                                        <TableCell>{registration.last_name}</TableCell>
                                        <TableCell style={styles.narrowCell}>{registration.dancer_role}</TableCell>
                                        <TableCell>{registration.admission}</TableCell>
                                        <TableCell>{registration.first_hour}</TableCell>
                                        <TableCell>{registration.second_hour}</TableCell>
                                        {/* <TableCell style={styles.narrowCell}>{registration.oweds}</TableCell> will need as app is built out */}
                                        {/* <TableCell>{registration.payment_type}</TableCell> will need as app is built out*/}
                                        <TableCell style={styles.narrowCell}><Button className="update" varient="raised"
                                            onClick={() => this.handleOneClick(registration.id)}>{registration.week_one}</Button></TableCell>
                                        <TableCell style={styles.narrowCell}><Button className="update" varient="raised"
                                            onClick={() => this.handleTwoClick(registration.id)}>{registration.week_two}</Button></TableCell>
                                        <TableCell style={styles.narrowCell}><Button className="update" varient="raised"
                                            onClick={() => this.handleThreeClick(registration.id)}>{registration.week_three}</Button></TableCell>
                                        <TableCell><Button className="update" varient="raised"
                                            onClick={() => this.handleFourClick(registration.id)}>{registration.week_four}</Button></TableCell>
                                        <TableCell>
                                            <Button className="delete" varient="raised"
                                                onClick={() => this.deleteRegistration(registration.id)}><DeleteForeverIcon /></Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {/* find better way to acomplish this */}
                    {/* Dialog open and the admin are able to input either a payment amount or track attendance with an 'X' */}
                    <Dialog
                        open={this.state.open}>
                        <UpdateWeekOne open={this.state.open} closeOne={this.closeOne} getRegistrations={this.getRegistrations} />
                    </Dialog>
                    <Dialog
                        open={this.state.twoOpen}>
                        <UpdateWeekTwo twoOpen={this.state.twoOpen} closeTwo={this.closeTwo} getRegistrations={this.getRegistrations} />
                    </Dialog>
                    <Dialog
                        open={this.state.threeOpen}>
                        <UpdateWeekThree threeOpen={this.state.threeOpen} closeThree={this.closeThree} getRegistrations={this.getRegistrations} />
                    </Dialog>
                    <Dialog
                        open={this.state.fourOpen}>
                        <UpdateWeekFour fourOpen={this.state.fourOpen} closeFour={this.closeFour} getRegistrations={this.getRegistrations} />
                    </Dialog>
                </div>
            );
        }
        return (
            <div>
                {/* passes history through props to enable 'push' */}
                <Nav history={this.props.history} />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AttendanceTable);