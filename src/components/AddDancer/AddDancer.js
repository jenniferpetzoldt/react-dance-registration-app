import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class AddDancer extends Component {
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <div>
                        <button>Add Dancer</button>
                    </div>
                    {/* Form dialog? */}

                    <div>
                        <form>
                            <label>First Name:</label>
                            <input />
                            <br />
                            <label>Last Name:</label>
                            <input />
                            <br />
                            <label>Email:</label>
                            <input />
                            <br />
                            <label>Role:</label>
                            <select></select>
                            <br />
                            <label>Admission:</label>
                            <select></select>
                            <label>First Class</label>
                            <select></select>
                            <label>Second Class</label>
                            <select></select>
                            <button>Add</button>
                            <button>Cancel</button>
                        </form>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddDancer);