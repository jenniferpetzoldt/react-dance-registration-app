import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Nav from '../Nav/Nav';



const mapStateToProps = state => ({
    user: state.user,
    state,
});

class SuccessPage extends Component {

    handleClick = () => {
        this.props.history.push('/registration');
    }

    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === false) {
            content = (
                <div id="success">
                    <h3> Success!</h3>
                    <p>You have registered for classes with Uptown Swing!</p>
                    <Button onClick={this.handleClick}>Register for More Classes</Button>
                </div>

            );
        }
        return (
            <div>
                <Nav history={this.props.history}/>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SuccessPage);