import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const space = " ";

class AttendanceTitle extends Component {
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    {/* loops over available forms in the reducer to populate the dropdown menu */}
                    {this.props.state.attend.map((attendMonth, i) => {
                        return <h2 key={i} value={attendMonth.id}>
                            {attendMonth.form_month + space + attendMonth.form_year} Wednesday Session</h2>
                    })}
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
export default connect(mapStateToProps)(AttendanceTitle);