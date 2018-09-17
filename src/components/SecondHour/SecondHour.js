import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class SecondHour extends Component {
    render() {
        return (
            <div>
                <h4>8:30pm - 9:45pm</h4>
                <h5>Level 2</h5>
                <h5>Level 3</h5>
                <h5>Level 5</h5>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SecondHour);