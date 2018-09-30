import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  user: state.user,
})

class Nav extends Component {
  render() {
    let content = null;

    if (this.props.user && this.props.user.admin === false) {
      content = (
        <div className="navbar">
          <div>
            <ul>
              <li className="nav">
                <Link to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav">
                <Link to="/registration">
                  Registration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    } else if (this.props.user && this.props.user.admin === true) {
      content = (
      <div className="navbar">
        <div>
          <ul>
            <li className="nav">
              <Link to="/attendance">
                Attendance
              </Link>
            </li>
            <li className="nav">
              <Link to="/form">
                CreateForm
              </Link>
            </li>
          </ul>
        </div>
      </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Nav);
