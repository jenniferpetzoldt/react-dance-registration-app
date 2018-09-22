import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';


const mapStateToProps = state => ({
    user: state.user,
    state,
});

class ClassNameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newForm: {
                startDate: this.props.state.createForm,
                month: '',
                year: '',
                levelOne: '',
                levelFour: '',
                soloJazz: '',
                levelTwo: '',
                levelThree: '',
                levelFive: '',
            },
        }
    }

    handleChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                [event.target.name]: event.target.value,
            },
        });
    }

    addNewForm = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_FORM', payload: this.state.newForm });
        axios({
            method: 'POST',
            url: '/api/form',
            data: { newForm: this.state.newForm }
        }).then((response) => {
            console.log('Success with form POST');
            this.props.dispatch({ type: 'CLEAR_FORM' });
        }).catch((error) => {
            console.log('Form Post error', error);
            alert('Unable to add form');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <form>
                        <h2>Class Names:</h2>
                        <p>Input class names including level below:</p>
                        <div>
                            <h3>07:00pm</h3>
                            <TextField 
                            label="Level 1"
                            name="levelOne" 
                            value="Level 1"
                            onChange={this.handleChange} />
                            <TextField 
                            label="Level 4"
                            name="levelFour"
                            value="Level 4" 
                            onChange={this.handleChange} />
                            <TextField 
                            label="Solo Jazz"
                            name="soloJazz" 
                            value="Solo Jazz"
                            onChange={this.handleChange} />
                            <h3>08:30pm</h3>
                            <TextField 
                            label="Level 2"
                            name="levelTwo"
                            value="Level 2" 
                            onChange={this.handleChange} />
                            <TextField 
                            label="Level 3"
                            name="levelThree"
                            value="Level 3" 
                            onChange={this.handleChange} />
                            <TextField 
                            label="Level 5"
                            name="levelFive"
                            value="Level 5" 
                            onChange={this.handleChange} />
                            <Button className="submit" varient="raised" onClick={this.addNewForm}>Submit</Button>
                        {/* add another button to send back to add another month's classes */}
                        </div>
                    </form>
                </div >
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClassNameInput);