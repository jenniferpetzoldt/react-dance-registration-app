import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Select, Button, TextField } from '@material-ui/core';

const mapStateToProps = state => ({
});

class AttendancePage extends Component {
    render() {
        return (
            <div>
                <div>
                    <Select></Select>
                </div>
                <div>
                    <div>
                    <Button>Add Dancer</Button>
                    </div>
                    {/* Form dialog? */}
                   
                    <div>
                        <form>
                        <TextField
                        label="Frist Name"/>
                        <TextField
                        label="Last Name"/>
                        <TextField 
                        label="Email"/>
                        <br/>
                        <Select label="role"></Select>
                        </form>
                        <Select label="admission"></Select>
                        <TextField
                        label="level"/>
                        <TextField
                        label="level"/>
                        <Button>Add</Button>
                        <Button>Cancel</Button>
                    </div>
                    
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps)(AttendancePage);