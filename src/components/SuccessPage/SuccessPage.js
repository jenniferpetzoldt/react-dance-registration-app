import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';


const mapStateToProps = state => ({
    user: state.user,
    state,
});

class SuccessPage extends Component {
    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === false) {
            content = (
                <div>
                    <h3> Success!</h3>
                    <p>You have registered for classes with Uptown Swing!</p>
                </div>
            );
        }
        return (
            <div>

                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SuccessPage);