import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.user,
    state,
});

class Lessons extends Component {
    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <form>
                    <h3>Lessons</h3>
                    <div className="firstHour">
                        <h4>7:00pm - 8:15pm</h4>
                        
                    </div>
                    <div className="secondHour">
                        <h4>8:30pm - 9:45pm</h4>
                        <h5>Level 2</h5>
                        <h5>Level 3</h5>
                        <h5>Level 5</h5>
                    </div>
                </form>
            )
        }
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Lessons);