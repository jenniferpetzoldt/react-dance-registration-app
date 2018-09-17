import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/registration">
            Registration
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
