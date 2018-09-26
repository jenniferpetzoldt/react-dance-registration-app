import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';

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

    deleteCreatedForm = (id) => {
        console.log('delete createdForm id', id);
       
        axios({
            method: 'DELETE',
            url: '/api/created/' + id
        }).then((response) => {
            this.getCreatedForms();
        }).catch((error) => {
            console.log('DELETE form error', error);
            alert('Unable to DELETE form');
        })
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
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
                            {this.state.createdForms.map((form) => {
                                return <TableRow key={form.id} value={form}>
                                <TableCell>{form.form_month}</TableCell>
                                <TableCell>{form.form_year}</TableCell>
                                <TableCell>{form.level_one}</TableCell>
                                <TableCell>{form.level_two}</TableCell>
                                <TableCell>{form.level_three}</TableCell>
                                <TableCell>{form.level_four}</TableCell>
                                <TableCell>{form.level_five}</TableCell>
                                <TableCell>{form.solo_jazz}</TableCell>
                                <TableCell><Button  className="delete" varient="raised" onClick={()=>this.deleteCreatedForm(form.id)}>Delete</Button></TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </div>
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