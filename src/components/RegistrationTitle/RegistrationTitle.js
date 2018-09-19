import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state,
});

class RegistrationTitle extends Component {
    render() {
        return (
            <div>
                <h2>Wednesday Session</h2>
            </div>
        )
    }
}

export default connect(mapStateToProps)(RegistrationTitle);