import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FormControl, Radio, TextField, FormLabel, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

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

class UpdateDancerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            dancerId: '', //pass id through props
            week1: '',
            week2: '',
            week3: '',
            week4: '',
        };
    }
    //updates local state as admin inputs information
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    //resets the form so the admin does not need to clear the fields
    clearInputs = () => {
        this.setState({
            week1: '',
            week2: '',
            week3: '',
            week4: '',
        })
    };

    // submits new registration to server & database and calls clearInputs()
    sendNewDancerInfo = () => {
        axios({
            method: 'POST',
            url: '/api/admin',
            data: { updateAttend: this.state }
        }).then((response) => {
            console.log('success with addDancer POST');
            this.clearInputs();
            this.getRegistrations();
        }).catch((error) => {
            console.log('Add Dancer Reg POST error', error);
            alert('Unable to add dancer reg from admin');
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form style={styles.form}>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 1" name="week1" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 2" name="week2" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 3" name="week3" onChange={this.handleChange} />
                    </FormControl>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 4" name="week4" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <Button className="submit" varient="raised" onClick={this.updateAttendance}>Submit</Button>
                </form>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
export default connect(mapStateToProps)(UpdateDancerModal);