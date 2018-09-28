import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FormControl, TextField, Button } from '@material-ui/core';

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

class UpdateWeekTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            dancerId: this.props.dancerId, //pass id through props
            week2: '',
        };
    }
    //updates local state as admin inputs information
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    // update request to update the specific registration

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form style={styles.form}>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 2" name="week2" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <Button className="submit" varient="raised" onClick={this.props.closeTwo}>Submit</Button>
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
export default connect(mapStateToProps)(UpdateWeekTwo);