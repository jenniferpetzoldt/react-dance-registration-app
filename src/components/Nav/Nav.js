import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
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
);

export default Nav;
