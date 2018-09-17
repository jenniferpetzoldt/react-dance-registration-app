import React, { Component } from 'react';
import { connect } from 'react-redux';
import FirstHour from '../FirstHour/FirstHour';
import SecondHour from '../SecondHour/SecondHour';

const mapStateToProps = state => ({
});

class Lessons extends Component {
    render() {
        return (
            <div className="Lessons">
                <h3>Lessons</h3>
                <FirstHour />
                <SecondHour />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Lessons);