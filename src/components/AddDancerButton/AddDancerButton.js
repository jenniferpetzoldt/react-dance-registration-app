import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
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

    // adjusts state to indicate if the add dancer button or the add dancer form should be shown
    toggleAddDancer = (event) => {
        this.setState({
            isHidden: !this.state.isHidden,
        })
    }

    render() {
        let content = null;
        const isHidden = this.state.isHidden;
        let addDancer;

        if (isHidden) {
            //if 'isHidden' is true will show the form
            addDancer = <div>
                        <AddDancerForm toggleAddDancer={this.toggleAddDancer}/>
                        </div>
        } else {
            // if 'isHidden' is false will show the button
            addDancer = <Button  className="submit" varient="raised" onClick={this.toggleAddDancer}>Add Dancer</Button>
        }

        if (this.props.user.userName && this.props.user.admin === true) {
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