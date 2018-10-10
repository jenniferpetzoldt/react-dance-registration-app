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
        width: 75,
    }
}

class UpdateWeekFour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            week4: '',
        };
    }
    //updates local state as admin inputs information
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    // update request to update the specific registration
    updateAttendance = (event) => {
        const id = this.props.state.adminInput.regId;
        let week4 = this.state.week4;
        axios({
            method: 'PUT',
            url: '/api/registration/weekFour/' + id,
            data: { week4: week4 }
        }).then((response) => {
            //closes dialog
            this.props.closeFour();
            //updates table with most recent data
            this.props.getRegistrations();
        }).catch((error) => {
            console.log('Attendance UPDATE error', error);
            alert('Unable to update registration');
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form style={styles.form}>
                    <FormControl className="updateModal" style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 4" name="week4" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    {/* create components for buttons */}
                    <Button className="editBtn" varient="raised" onClick={this.props.closeFour}>Cancel</Button>
                    <Button className="editBtn" varient="raised" onClick={this.updateAttendance}>Submit</Button>
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
export default connect(mapStateToProps)(UpdateWeekFour);