import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class FirstHourClassNameInput extends Component {
    render() {
        return (
            <div>
                <h3>07:00pm</h3>
                <label>Level 1</label>
                <input />
                <label>Level 4</label>
                <input />
                <label>Solo Jazz</label>
                <input />
            </div>
        )
    }
}

export default connect(mapStateToProps)(FirstHourClassNameInput);