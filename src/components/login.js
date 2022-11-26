import React from 'react';
import '../App.css';

const Login = (props) => {
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[user, setUser] = React.useState({})

  const updateEmail = evt => {
    setEmail(evt.target.value);
  };

  const updatePassword = evt => {
    setPassword(evt.target.value);
  };

  const handleLogin = evt => {
    evt.preventDefault()
    const userJson = { 'email': email, 'password': password };

    if (email === "" || password === "") {
      alert("Please enter both email and password.")
    } else {
      fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userJson)
      })
        .then((response) => response.json())
        .then((userData) => {setUser(userData);
        console.log(user);
    });
    }}

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
            value={email}
            onChange={updateEmail}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            id="user_password"
            value={password}
            onChange={updatePassword}
          />
          <input type="submit" />
        </div>
      </form>
    </React.Fragment>
  );
}

export default Login;
