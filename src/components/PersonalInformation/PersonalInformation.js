import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class PersonalInformation extends Component {
    render() {
        return (
            <div className="Personal Information">
                <h3>1. Personal Information:</h3>
                <label>First Name:</label>
                <input />
                <br />
                <label>Last Name:</label>
                <input />
                <br />
                <label>Email:</label>
                <input />
                <br />
                <label>Role:</label>
                <select></select>
                <br />
                <label>Admission:</label>
                <select></select>
                <br />
                <p>Students with student id recieve discount</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PersonalInformation);