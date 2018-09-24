import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalEditDialog from '../PersonalEditDialog/PersonalEditDialog';
import axios from 'axios';
import { Dialog } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editOpen: false,
        }
    }

    submitRegistration = (event) => {
        axios({
            method: 'POST',
            url: '/api/registration',
            data: { newReg: this.props.state.userInput }
        }).then((response) => {
            console.log('Success with registration POST');
            this.props.dispatch({ type: 'CLEAR_USER_INPUT' });
        }).catch((error) => {
            console.log('Registration POST error', error);
            alert('Unable to add registration');
        })
        this.props.closeConfirm();
    }

    editClick = (event) => {
        this.setState({
            editOpen: true,
        });
    }


    closeClick = (event) => {
        console.log('in closeClick');
        this.setState({
            editOpen: false,
        });
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <h1>Confirm Registration Information</h1>
                        <h3>PersonalInformation:</h3>
                        <p>Name: {this.props.state.userInput.userInfo.firstName} {this.props.state.userInput.userInfo.lastName}</p>
                        <p>Email: {this.props.state.userInput.userInfo.email}</p>
                        <p>Role: {this.props.state.userInput.userInfo.role}</p>
                        <p>Admission: {this.props.state.userInput.userInfo.admission}</p>
                        <h3>Lessons:</h3>
                        <p>7:00pm-8:15pm {this.props.state.userInput.firstHour.className}</p>
                        <p>8:30pm-9:45pm {this.props.state.userInput.secondHour.className}</p>
                        <h3>Payment Method:</h3>
                        {this.props.state.userInput.payment.paymentMethod}
                        <h3>Total Cost:</h3>
                        <p>${this.props.state.userInput.total}.00</p>
                        <br />
                        <button onClick={this.submitRegistration}>Submit</button>
                        <button onClick={this.editClick}>Edit</button>
                    </div>
                    <Dialog
                        open={this.state.editOpen} >
                        <PersonalEditDialog editOpen={this.state.editOpen} closeClick={this.closeClick}/>
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