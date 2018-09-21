import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

const space = " ";

class RegistrationTitle extends Component {
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    {/* loops over available forms in the reducer to populate the dropdown menu */}
                    {this.props.state.registrationReducer.map((registration, i) => {
                        return <h2 key={i} value={registration.id}>
                            {registration.form_month + space + registration.form_year} Wednesday Session</h2>
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
export default connect(mapStateToProps)(RegistrationTitle);