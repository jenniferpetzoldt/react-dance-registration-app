import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import ClassNameInput from '../ClassNameInput/ClassNameInput';



const mapStateToProps = state => ({
});

class CreateFormPage extends Component {
    render() {
        return (
            <div>
                <Nav />
                <ClassNameInput />
            </div>
        )
    }
}

export default connect(mapStateToProps)(CreateFormPage);