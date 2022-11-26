import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav() {
  const[user, setUser] = React.useState("");

  useEffect(() => {
    fetch('/user')
      .then((response) => response.text())
      .then((user_id) => {setUser(user_id)});
  }, []);
  
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
        </ul>
      </nav>
    );
  }
  
}

export default Nav;