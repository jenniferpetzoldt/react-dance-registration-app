import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
// import { withStyles } from '@material-ui/core/styles';
// import { Typography, Modal, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class Confirm extends Component {
    // state = {
    //     open: true,
    // };

    // handleOpen = () => {
    //     this.setState({ open: true });
    // };

    // handleClose = () => {
    //     this.setState({ open: false });
    // };

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <div>
                            <h1>Confirm Registration Information</h1>
                            <h3>PersonalInformation:</h3>
                           <p>Name: {this.props.state.userInputReducer.personalInfo.firstName} {this.props.state.userInputReducer.personalInfo.lastName}</p> 
                           <p>Email: {this.props.state.userInputReducer.personalInfo.email}</p>
                            <p>Role: {this.props.state.userInputReducer.personalInfo.role}</p>
                            <p>Admission: {this.props.state.userInputReducer.personalInfo.admission}</p>
                            <h3>Lessons:</h3>
                            <p>7:00pm-8:15pm {this.props.state.userInputReducer.lessons.firstHour.className}</p>
                            <p>8:30pm-9:45pm {this.props.state.userInputReducer.lessons.secondHour.className}</p>
                            <h3>Payment Method:</h3>
                            {this.props.state.userInputReducer.payment.paymentMethod}
                            <h3>Total Cost:</h3>
                            <p>${this.props.state.userInputReducer.payment.totalCost}.00</p>
                            <br />
                            <button>Submit</button>
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