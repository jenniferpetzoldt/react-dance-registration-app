import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
})


class Nav extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    if (this.props.user && this.props.user.admin === false) {
      content = (
        <div className="navbar">
          <Grid >
            <ul>
              {/* Don't need this for presentation but will for further building out the app */}
              {/* <li className="nav">
                <Link to="/registration">
                  Registration
                </Link>
              </li> */}
              <li>
                <Button id="logOutBtn" onClick={this.logout}>Log Out</Button>
              </li>
            </ul>
          </Grid>
        </div>
      )
    } else if (this.props.user && this.props.user.admin === true) {
      content = (
        <div className="navbar">
          <Grid >
            <ul>
              <li className="nav">
                <Link to="/attendance">
                  Attendance
              </Link>
              </li>
              <li className="nav">
                <Link to="/form">
                  Create Form
              </Link>
              </li>
              <li>
                <Button id="logOutBtn" onClick={this.logout}>Log Out</Button>
              </li>
            </ul>
          </Grid>
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
