import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button} from '@material-ui/core';
import AddDancerForm from '../AddDancerForm/AddDancerForm';
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
        const isHidden = this.state.isHidden;
        let addDancer;

        if(isHidden) {
            addDancer = <AddDancerForm />
        } else {
            addDancer = <Button onClick={this.toggleToForm}>Add Dancer</Button>
        }

        if (this.props.user.userName) {
            content = (
                <div>
                    {addDancer}
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