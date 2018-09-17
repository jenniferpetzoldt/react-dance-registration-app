import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class SuccessPage extends Component {
    render() {
        return (
            <div>
                <p>Success message here!</p>
            </div>
        )
    }
}

export default connect(mapStateToProps)(SuccessPage);