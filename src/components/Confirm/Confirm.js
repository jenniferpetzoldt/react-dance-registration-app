import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class Confirm extends Component {

    sendRegistration = () => {
        axios({
            method: 'POST', 
            url: '/api/registration',
            data: { newReg: this.props.state.userInput}
        }).then((response) => {
            console.log('Success with registration POST');
            this.props.dispatch({ type: 'CLEAR_USER_INPUT'});
        }).catch((error)=>{
            console.log('Registration POST error', error);
            alert('Unable to add registration');
        })
    }

    submitRegistration = (event) => {
        this.sendRegistration();
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <div>
                            {JSON.stringify(this.props.state.userInput.payment.totalCost)}
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
                            {/* <h3>Total Cost:</h3>
                            <p>${this.props.state.userInput.payment.totalCost}.00</p>
                            <br /> */}
                            <button onClick={this.submitRegistration}>Submit</button>
                            <button>Edit</button>
                        </div>
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


export default connect(mapStateToProps)(Confirm);

// https://material-ui.com/utils/modal/ 