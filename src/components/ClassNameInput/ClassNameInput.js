import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { TextField, FormControl, Grid, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const styles = {
    formControl: {
        margin: 15,
    },
    textField: {
        width: 55,
    }
}

class ClassNameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newForm: {
                startDate: this.props.state.createForm.date,
                month: this.props.state.createForm.month,
                year: this.props.state.createForm.year,
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
            this.props.history.push('/form');
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
                    <form id="classInputForm">
                        <h2>Class Names:</h2>
                        <p>Input class names including level below:</p>
                        <Grid>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 1" name="levelOne" value={this.state.newForm.levelOne} 
                                            onChange={this.handleChange} />
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 2" name="levelTwo" value={this.state.newForm.levelTwo}
                                            onChange={this.handleChange} />
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 3"  name="levelThree" value={this.state.newForm.levelThree}
                                            onChange={this.handleChange} />
                            </FormControl>
                            <br />
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 4" name="levelFour"value={this.state.newForm.levelFour}
                                            onChange={this.handleChange} />
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 5" name="levelFive" value={this.state.newForm.levelFive}
                                            onChange={this.handleChange} />
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Solo Jazz" name="soloJazz" value={this.state.newForm.soloJazz}
                                            onChange={this.handleChange} />
                            </FormControl>
                            <br />
                            <Button className="cancel" varient="raised">Cancel</Button>
                            <Button className="submit" varient="raised" onClick={this.addNewForm}>Submit</Button>
                        </Grid>
                    </form>
                </div >
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

export default connect(mapStateToProps)(ClassNameInput);