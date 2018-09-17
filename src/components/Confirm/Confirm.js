import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
// import { Typography, Modal, Button } from '@material-ui/core';

const mapStateToProps = state => ({
});

class Confirm extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        return (
            <div>
                <button onClick={this.handleOpen}>Confirm</button>
                    <div id="confirmModal" className="modal">
                    <div className="modal-content">
                    <h1>Confirm Registration Information</h1>
                    <h3>PersonalInformation:</h3>
                    <h3>Lessons:</h3>
                    <h3>Payment Method:</h3>
                    <button>Submit</button>
                    <button>Edit</button>
                    </div>
                        
                    </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Confirm);

// https://material-ui.com/utils/modal/ 