import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import MonthHeaderInput from '../MonthHeaderInput/MonthHeaderInput';
import FirstHourClassNameInput from '../FirstHourClassNameInput/FirstHourClassNameInput';
import SecondHourClassNameInput from '../SecondHourClassNameInput/SecondHourClassNameInput';

const mapStateToProps = state => ({
});

class CreateFormPage extends Component {
    render() {
        return (
            <div>
                <Nav />
                <MonthHeaderInput />
                <h2>Lessons</h2>
                <FirstHourClassNameInput />
                <SecondHourClassNameInput />
                <button>Create Form</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CreateFormPage);