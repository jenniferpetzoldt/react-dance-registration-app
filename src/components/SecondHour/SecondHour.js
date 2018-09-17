import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class SecondHour extends Component {
    render() {
        return (
           <h1></h1> 
        )
    }
}

export default connect(mapStateToProps)(SecondHour);