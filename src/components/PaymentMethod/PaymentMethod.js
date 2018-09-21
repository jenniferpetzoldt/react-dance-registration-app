import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import RegistrationTitle from '../RegistrationTitle/RegistrationTitle';
import { FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payment: {
                paymentMethod: '',
                totalCost: '',
            },
        }
    }

    componentDidMount() {
        this.calculateTotal();
    }

    addPayment = () => {
        this.props.dispatch({ type: 'ADD_PAYMENT', payload: this.state.payment });
    }

    calculateTotal = () => {
        const firstHourCost = Number(this.props.state.userInputReducer.lessons.firstHour.cost);
        const secondHourCost = Number(this.props.state.userInputReducer.lessons.secondHour.cost);
        const total = firstHourCost + secondHourCost;
        const stringTotal = String(total);
        this.setState({
            payment: {
                ...this.state.payment,
                totalCost: stringTotal,
            },
        });
    }

    handleChange = (event) => {
        this.setState({
            payment: {
                ...this.state.payment,
                paymentMethod: event.target.value,
            },
        })
    }

    handleConfirmClick = (event) => {
        this.addPayment();
        this.props.history.push('/confirm');
    }
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div className="Payment Method">
                    <RegistrationTitle />
                    <h3>3. Payment Method</h3>
                    <FormControl>
                        <RadioGroup
                            aria-label="7:00pm - 8:15pm"
                            name="payment"
                            value={this.state.payment.paymentMethod}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value="Pay at the Door"
                                control={<Radio color="primary" />}
                                label="Pay at the Door" />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <Button className="next" varient="raised"
                        onClick={this.handleConfirmClick}>Confirm</Button>
                </div>
            )
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(PaymentMethod);