import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class Lessons extends Component {
    render() {
        return (
            <div className="Lessons">
            <h3>Lessons</h3>
            <h4>7:00pm - 8:15pm</h4>
            <h5>Level 1</h5>
            <h5>Level 4</h5>
            <h5>Solo Jazz</h5>
            <h4>8:30pm - 9:45pm</h4>
            <h5>Level 2</h5>
            <h5>Level 3</h5>
            <h5>Level 5</h5>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Lessons);