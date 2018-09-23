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
        this.state = { isHidden: false };
    }

    toggleToForm = (event) => {
        this.setState({
            isHidden: true,
        })
    }

    toggleFromForm = (event) => {
        this.setState({
            isHidden: !this.state.isHidden,
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div onClick={this.toggleToForm}>
                        {this.state.isHidden ?
                            <div>
                                <AddDancerDialog />
                            </div>
                            : <Button>Add Dancer</Button>}
                    </div>
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