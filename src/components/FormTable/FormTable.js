import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class FormTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            createdForms: [],
        }
    }
    componentDidMount() {
        this.getCreatedForms();
    }

    getCreatedForms = () => {
        axios({
            method: 'GET',
            url: '/api/created'
        }).then((response) => {
            this.setState({createdForms: response.data,});
        }).catch((error) => {
            console.log('Created Forms GET error', error);
            alert('Unable to GET created forms');
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Month</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Level 1</TableCell>
                                <TableCell>Level 2</TableCell>
                                <TableCell>Level 3</TableCell>
                                <TableCell>Level 4</TableCell>
                                <TableCell>Level 5</TableCell>
                                <TableCell>Solo Jazz</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.createdForms.map((form, i) => {
                                return <TableRow key={i} value={form}>
                                <TableCell>{form.form_month}</TableCell>
                                <TableCell>{form.form_year}</TableCell>
                                <TableCell>{form.level_one}</TableCell>
                                <TableCell>{form.level_two}</TableCell>
                                <TableCell>{form.level_three}</TableCell>
                                <TableCell>{form.level_four}</TableCell>
                                <TableCell>{form.level_five}</TableCell>
                                <TableCell>{form.solo_jazz}</TableCell>
                                <TableCell><Button>Delete</Button></TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
export default connect(mapStateToProps)(FormTable);