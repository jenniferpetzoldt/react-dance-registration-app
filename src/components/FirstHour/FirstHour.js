import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class FirstHour extends Component {
    render() {
        return (
            <div>
                <h4>7:00pm - 8:15pm</h4>
                <h5>Level 1</h5>
                <h5>Level 4</h5>
                <h5>Solo Jazz</h5>
            </div>
        )
    }
}

export default connect(mapStateToProps)(FirstHour);