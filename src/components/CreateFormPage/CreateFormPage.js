import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import ClassNameInput from '../ClassNameInput/ClassNameInput';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class CreateFormPage extends Component {
    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <ClassNameInput />
                </div>
            );
        }

        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CreateFormPage);