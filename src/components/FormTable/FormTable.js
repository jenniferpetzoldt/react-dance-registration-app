import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class FormTable extends Component {
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow></TableRow>
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