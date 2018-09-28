import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FormControl,TextField, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});



class UpdateWeekOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ensures registration is linked to the correct from by using information from the redux state
            formId: this.props.state.adminInput.attendId,
            dancerId: this.props.dancerId, //pass id through props
            week1: '',
        };
    }
    //updates local state as admin inputs information
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    // update request to update the specific registration
    updateAttendance(){
        
    }
    
 

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form>
                    <FormControl>
                        <TextField label="Week 1" name="week1" onChange={this.handleChange} />
                    </FormControl>
                    <br />
                    <Button className="submit" varient="raised" onClick={this.props.closeOne}>Submit</Button>
                    <Button className="cancel" varient="raised" onClick={this.props.closeOne}>Cancel</Button>
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
export default connect(mapStateToProps)(UpdateWeekOne);