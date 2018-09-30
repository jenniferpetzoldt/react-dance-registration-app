import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalEditDialog from '../PersonalEditDialog/PersonalEditDialog';
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

    dispatchTotal = () => {
        const firstHourCost = Number(this.props.state.userInput.lessons.firstHourCost);
        const secondHourCost = Number(this.props.state.userInput.lessons.secondHourCost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);
        this.props.dispatch({ type: 'ADD_TOTAL', payload: stringTotal });
        console.log('in calculateTotal', stringTotal);
    }

    submitRegistration = (event) => {
        this.dispatchTotal();
        //need to find a betterway to do this
        setTimeout(() => {
            this.sendRegistration();
        }, 1);
    }

    sendRegistration = () => {
        axios({
            method: 'POST',
            url: '/api/registration',
            data: { newReg: this.props.state.userInput }
        }).then((response) => {
            console.log('Success with registration POST');
            this.props.dispatch({ type: 'CLEAR_USER_INPUT' });
            this.props.closeConfirm();
        }).catch((error) => {
            console.log('Registration POST error', error);
            alert('Unable to add registration');
        })
    }

    editClick = (event) => {
        this.setState({
            editOpen: true,
        });
    }


    closeClick = (event) => {
        this.setState({
            editOpen: false,
        });
    }

    render() {
        let content = null;
        const firstHourCost = Number(this.props.state.userInput.lessons.firstHourCost);
        const secondHourCost = Number(this.props.state.userInput.lessons.secondHourCost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);

        if (this.props.user.userName && this.props.user.admin === false) {
            content = (
                <div className="confirm">
                    <h3>Confirm Registration Information</h3>
                    <h3>PersonalInformation:</h3>
                    <p>Name: {this.props.state.userInput.personalInfo.firstName} {this.props.state.userInput.personalInfo.lastName}</p>
                    <p>Email: {this.props.state.userInput.personalInfo.email}</p>
                    <p>Role: {this.props.state.userInput.personalInfo.role} </p>
                    <p>Admission: {this.props.state.userInput.personalInfo.admission}</p>
                    <h3>Lessons:</h3>
                    <p>{this.props.state.userInput.lessons.firstHour}</p>
                    <p>{this.props.state.userInput.lessons.secondHour}</p>
                    <h3>Payment Method:</h3>
                    {this.props.state.userInput.payment.paymentMethod}
                    <h3>Total Cost:</h3>
                    <p>${stringTotal}.00</p>
                    <br />
                    <Button className="submit" varient="raised" onClick={this.submitRegistration}>Submit</Button>
                    <Button className="edit" varient="raised" onClick={this.editClick}>Edit</Button>
                    <Dialog
                        open={this.state.editOpen} >
                        <PersonalEditDialog editOpen={this.state.editOpen} closeClick={this.closeClick} />
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