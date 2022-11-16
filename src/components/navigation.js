import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav() {
  return (
    <nav>
      <h3>Site Name</h3>
      <ul>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;