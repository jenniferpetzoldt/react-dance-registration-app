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

class UpdateWeekThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            dancerId: this.props.dancerId, //pass id through props
            week3: '',
        };
    }
    //updates local state as admin inputs information
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    // get request to get the attendance data from the dancer's id
  

    // update request to update the specific registration

    
 

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form style={styles.form}>
                    <FormControl style={styles.formControl}>
                        <TextField style={styles.textField} label="Week 3" name="week3" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <Button className="submit" varient="raised" onClick={this.props.closeThree}>Submit</Button>
                    <Button className="cancel" varient="raised" onClick={this.props.closeThree}>Cancel</Button>
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