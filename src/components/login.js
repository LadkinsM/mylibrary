import React from 'react';
import { Link, Navigate, useNavigate, Route } from 'react-router-dom';
import App from '../App';
import '../App.css';

const Login = ({handleLogin, updateEmail, updatePassword, isLoggedIn}) => {

  const navigate = useNavigate();

  if (isLoggedIn == true) {
    return navigate(`/search`)
  } else {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form id="login" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">User Email:</label>
            <input 
              type="text"
              name="email"
              id="user_email"
              onChange={updateEmail}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              id="user_password"
              onChange={updatePassword}
            />
            <input type="submit" />
          </div>
        </form>
        <button><Link to="/signup">No account? Click here to sign up!</Link></button>
      </React.Fragment>
    );
  };
}

export default Login;
