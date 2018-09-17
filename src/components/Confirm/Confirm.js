import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Modal, Button } from '@material-ui/core';

const mapStateToProps = state => ({
});

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        // backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
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
                <Button onClick={this.handleOpen}>Confirm</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()}>
                        <Typography variant="title" id="modal-title">
                            Confirm Registration Information
                    </Typography>
                        <Typography variant="subheading">
                            Personal Information:
                    </Typography>
                        <Typography variant="subheading">
                            Lessons:
                    </Typography>
                        <Typography variant="subheading">
                            Payment Method:
                    </Typography>
                        <Button>Submit</Button>
                        <Button onClick={this.handlClose}>Edit</Button>
                        <ConfirmModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}


const ConfirmModalWrapped = withStyles(styles)(Confirm);

export default connect(mapStateToProps)(Confirm);

// https://material-ui.com/utils/modal/ 