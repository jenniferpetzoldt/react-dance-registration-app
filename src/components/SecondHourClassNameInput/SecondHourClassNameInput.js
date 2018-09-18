import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class SecondHourClassNameInput extends Component {
    render() {
        return (
            <div>
                <h3>08:30pm</h3>
                <label>Level 2</label>
                <input />
                <label>Level 3</label>
                <input />
                <label>Level 5</label>
                <input />
            </div>
        )
    }
}

export default connect(mapStateToProps)(SecondHourClassNameInput);