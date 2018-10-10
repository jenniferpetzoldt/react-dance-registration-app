import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditDialog from '../EditDialog/EditDialog';
import axios from 'axios';
import { Dialog, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editOpen: false,
            total: '',
        }
    }

    //sends total cost to redux
    dispatchTotal = () => {
        const firstHourCost = Number(this.props.state.userInput.lessons.firstHourCost);
        const secondHourCost = Number(this.props.state.userInput.lessons.secondHourCost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);
        this.props.dispatch({ type: 'ADD_TOTAL', payload: stringTotal });
    }

    // on submit button click the total is send to redux and the registration is sent to the database
    submitRegistration = (event) => {
        this.dispatchTotal();
        //need to find a betterway to do this
        setTimeout(() => {
            this.sendRegistration();
        }, 1);
    }
    // sends registration to database
    sendRegistration = () => {
        const id = this.props.state.userInput;
        axios({
            method: 'POST',
            url: '/api/registration',
            data: { newReg: id }
        }).then((response) => {
            // clears registration data from redux
            this.props.dispatch({ type: 'CLEAR_USER_INPUT' });
            // closes the confirm dialog
            this.props.closeConfirm();
        }).catch((error) => {
            console.log('Registration POST error', error);
            alert('Unable to add registration');
        })
    }
    // sets state to open the edit dialog
    editClick = (event) => {
        this.setState({
            editOpen: true,
        });
    }
    // sends user back to main registration page on cancel button click
    cancelClick = (event) => {
        this.props.history.push('/registration');
    }
    // set state to close the edit dialog
    closeClick = (event) => {
        this.setState({
            editOpen: false,
        });
    }

    render() {
        let content = null;
        //calculates total cost to display for confirm dialog
        const firstHourCost = Number(this.props.state.userInput.lessons.firstHourCost);
        const secondHourCost = Number(this.props.state.userInput.lessons.secondHourCost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);

        if (this.props.user.userName && this.props.user.admin === false) {
            content = (
                <div id="confirm">
                    <h3>Confirm Registration Information</h3>
                    <h4>PersonalInformation:</h4>
                    <p>Name: {this.props.state.userInput.personalInfo.firstName} {this.props.state.userInput.personalInfo.lastName}</p>
                    <p>Email: {this.props.state.userInput.personalInfo.email}</p>
                    <p>Role: {this.props.state.userInput.personalInfo.role} </p>
                    <p>Admission: {this.props.state.userInput.personalInfo.admission}</p>
                    <h4>Lessons:</h4>
                    <p>{this.props.state.userInput.lessons.firstHour}</p>
                    <p>{this.props.state.userInput.lessons.secondHour}</p>
                    <h4>Payment Method:</h4>
                    {this.props.state.userInput.payment.paymentMethod}
                    <h4>Total Cost:</h4>
                    <p>${stringTotal}.00</p>
                    <br />
                    {/* create button components */}
                    <Button className="confirmBtn" varient="raised" onClick={this.cancelClick}>Cancel</Button>
                    <Button className="confirmBtn" varient="raised" onClick={this.editClick}>Edit</Button>
                    <Button className="confirmBtn" varient="raised" onClick={this.submitRegistration}>Submit</Button>
                    <Dialog
                        open={this.state.editOpen} >
                        <EditDialog history={this.props.history} editOpen={this.state.editOpen} closeClick={this.closeClick} />
                    </Dialog>
                </div>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}


export default connect(mapStateToProps)(Confirm);