import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class PaymentMethod extends Component {
    render() {
        return (
            <div className="Payment Method">
                <h3>3. Payment Method</h3>
                <select></select>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PaymentMethod);