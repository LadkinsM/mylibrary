import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Nav() {
  const[user, setUser] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/user')
      .then((response) => response.text())
      .then((user_id) => {setUser(user_id)});
  }, []);

  const handleSignOut = evt => {
    fetch('/logout')
      .then((response) => response.text())
      .then((updateLogin) => {setUser(updateLogin)});
  };
  
  if (user == "False"){
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
    );}
  else {
    return (
      <nav>
        <h3>Site Name</h3>
        <ul>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to={`/user/${user}/profile`}>MyProfile</Link>
          </li>
          <li>
            <a href="" onClick={handleSignOut}>Logout</a>
          </li>
        </ul>
      </nav>
    );
  }
  
};

export default Nav;