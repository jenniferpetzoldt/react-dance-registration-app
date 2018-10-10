import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { TextField, FormControl, FormHelperText, Grid, Button } from '@material-ui/core';

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
    // sends user back to the main Create Form page
    cancelClick = (event) => {
        this.props.history.push('/form');
    }

    // sets local state with the class names
    handleChange = (event) => {
        this.setState({
            newForm: {
                ...this.state.newForm,
                [event.target.name]: event.target.value,
            },
        });
    }

    // sends info for new session form to the database
    addNewForm = event => {
        event.preventDefault();
        const id = this.state.newForm;
        axios({
            method: 'POST',
            url: '/api/form',
            data: { newForm: id }
        }).then((response) => {
            // clears form data from redux so user can continue to submit more forms
            this.props.dispatch({ type: 'CLEAR_FORM' });
            // sends user back to the create form page
            this.props.history.push('/form');
        }).catch((error) => {
            console.log('Form Post error', error);
            alert('Unable to add form');
        })
    }

    render() {
        let content = null;

        if (this.props.user.userName && this.props.user.admin === true) {
            content = (
                <div>
                    <form id="classInputForm">
                        <h3>Class Names:</h3>
                        <Grid>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 1" name="levelOne" value={this.state.newForm.levelOne}
                                    onChange={this.handleChange} />
                                <FormHelperText>ex. Level 1 (8-Count)</FormHelperText>
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 2" name="levelTwo" value={this.state.newForm.levelTwo}
                                    onChange={this.handleChange} />
                                <FormHelperText>ex. Level 2 (Swingout)</FormHelperText>
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 3" name="levelThree" value={this.state.newForm.levelThree}
                                    onChange={this.handleChange} />
                                <FormHelperText>ex. Level 3 (Connection)</FormHelperText>
                            </FormControl>
                            <br />
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 4" name="levelFour" value={this.state.newForm.levelFour}
                                    onChange={this.handleChange} />
                                <FormHelperText>ex. Level 4 </FormHelperText>
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Level 5" name="levelFive" value={this.state.newForm.levelFive}
                                    onChange={this.handleChange} />
                                <FormHelperText>ex. Level 5 </FormHelperText>
                            </FormControl>
                            <FormControl style={styles.formControl}>
                                <TextField label="Solo Jazz" name="soloJazz" value={this.state.newForm.soloJazz}
                                    onChange={this.handleChange} />
                                <FormHelperText>ex. Solo Jazz (Tranky Doo)</FormHelperText>
                            </FormControl>
                            <br />
                            {/* cancel button into it's own component */}
                            <Button className="cancel" varient="raised" onClick={this.cancelClick}>Cancel</Button>
                            <Button className="submit" varient="raised" onClick={this.addNewForm}>Submit</Button>
                        </Grid>
                    </form>
                </div >
            );
        }
        return (
            <div>
                {/* passes history through props to enable 'push' */}
                <Nav history={this.props.history} />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClassNameInput);