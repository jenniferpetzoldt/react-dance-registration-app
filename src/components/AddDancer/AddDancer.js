import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
});

class AddDancer extends Component {
    render() {
        return (
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
        )
    }
}

export default connect(mapStateToProps)(AddDancer);