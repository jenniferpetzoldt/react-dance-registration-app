import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class RegistrationTitle extends Component {
    render() {
        return (
            <div>
            <h2>Month Year Wednesday Session</h2>
            </div>
        )
    }
}

export default connect(mapStateToProps)(RegistrationTitle);