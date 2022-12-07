import logo from './logo.svg';
import './App.css';
import React from 'react';
import Navigation from "./components/navigation";
import Login from "./components/login";
import Search from "./components/search";
import BookDetails from "./components/bookdetails";
import UserDetails from './components/userdetails';
import CreateShelf from "./components/createShelf";
import SignUp from "./components/signup";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { AddReview, EditReview } from './components/reviewcomp';

function App() {
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[user, setUser] = React.useState({});
  const[isLoggedIn, setIsLoggedIn] = React.useState(false);

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
        setIsLoggedIn(true);})
  }};

  const handleSignOut = evt => {
    fetch('/logout')
      .then((response) => response.text())
      .then((updateLogin) => {setUser(updateLogin);
      setIsLoggedIn(false)});
  };

  return (
    <Router>
      <Navigation user={user} handleSignOut={evt => handleSignOut(evt)} isLoggedIn={isLoggedIn} />
      <Routes>
          <Route path="/login" element={ <Login handleLogin={evt => handleLogin(evt)}
                                                updateEmail={evt => updateEmail(evt)}
                                                updatePassword={evt => updatePassword(evt)}
                                                email={email}
                                                password={password} /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/search" element={ <Search /> } />
          <Route path="/search/book_details/:book_id" element={ <BookDetails user={user} 
                                                                isLoggedIn={isLoggedIn} />} />
          <Route path="/user/:user_id/profile/book_details/:book_id" element={ <BookDetails user={user} 
                                                                                isLoggedIn={isLoggedIn} />} />
          <Route path="/book/:book_id/addReview" element={ <AddReview user={user} /> } />
          <Route path="/book/:book_id/:review_id/editReview" element={ <EditReview user={user} /> } />
          <Route path="/user/:user_id/profile" element={ <UserDetails user={user} /> } />
          <Route path="/user/:user_id/createshelf" element={ <CreateShelf user={user} />} />

      </Routes>
    </Router>
  );
}

export default App;

