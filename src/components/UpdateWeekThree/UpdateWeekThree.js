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
        width: 75,
    }
}

class UpdateWeekThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            week3: '',
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
    console.log('id in updateWeekOne', this.props.state.adminInput.regId);
    const id = this.props.state.adminInput.regId;
    axios({
        method: 'PUT',
        url: '/api/registration/weekThree/' + id,
        data: {week3: this.state.week3}
    }).then((response) => {
        this.props.closeThree();
        this.props.getRegistrations();
    }).catch((error)=> {
        console.log('Attendance UPDATE error', error);
        alert('Unable to update registration');
    })
}
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form className="updateModal" style={styles.form}>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 3" name="week3" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <Button className="editBtn" varient="raised" onClick={this.updateAttendance}>Submit</Button>
                    <Button className="editBtn" varient="raised" onClick={this.props.closeThree}>Cancel</Button>
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
export default connect(mapStateToProps)(UpdateWeekThree);