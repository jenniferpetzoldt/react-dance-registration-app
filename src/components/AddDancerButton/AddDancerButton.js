import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog } from '@material-ui/core';
import AddDancerDialog from '../AddDancerDialog/AddDancerDialog';
const mapStateToProps = state => ({
    user: state.user,
    state,
});

class AddDancer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    
    addDancer = (event) => {
        this.setState({
            open: true,
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <Button onClick={this.addDancer}>Add Dancer</Button>
                    </div>
                    <Dialog
                    open={this.state.open}>
                        <AddDancerDialog />
                    </Dialog>
                </div>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddDancer);