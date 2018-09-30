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
                    <p>Success message here!</p>
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