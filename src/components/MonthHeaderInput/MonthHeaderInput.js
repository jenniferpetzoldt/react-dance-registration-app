import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class MonthHeaderInput extends Component {
    render() {
        return (
            <div>
                <label>Month</label>
                <input />
                <label>Year</label>
                <input />
                Tuesdays
        </div>
        )
    }
}

export default connect(mapStateToProps)(MonthHeaderInput);