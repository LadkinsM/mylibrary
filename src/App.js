import './App.css';
import React, { useEffect } from 'react';
import Navigation from "./components/navigation";
import Login from "./components/login";
import Search from "./components/search";
import BookDetails from "./components/bookdetails";
import UserDetails from './components/userdetails';
import CreateShelf from "./components/createShelf";
import SignUp from "./components/signup";
import Home from "./components/Home";

import { Route, Routes, useNavigate, redirect } from "react-router-dom";
import { AddReview, EditReview } from './components/reviewcomp';

function App() {
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const[user, setUser] = React.useState({});
  const[isLoggedIn, setIsLoggedIn] = React.useState(false);
  const[loading, setLoading] = React.useState(false);


  useEffect(() => {
    setLoading(true)
    fetch(`/user`)
      .then((response) => response.json())
      .then((userData) => {
        if (!(userData.user_id)) {
          setUser({});
          setIsLoggedIn(false);}
        else {
          setUser(userData);
          setIsLoggedIn(true);}
      setLoading(false)})
  }, []);

  useEffect(() => {
    console.log("This is the redirect useEffect.");
    console.log(isLoggedIn);
    if (!(isLoggedIn)) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      redirect(`/`)
    }
  }, [isLoggedIn])

  const updateEmail = evt => {
    setEmail(evt.target.value);
  };

  const updatePassword = evt => {
    setPassword(evt.target.value);
  };

  const confirmLogin = (user) => {
    if (user === "Incorrect Email") {
      alert("Email and password is incorrect.")
    } else if (user === "Incorrect Password") {
      alert("Password is incorrect.")
    } else {
      setIsLoggedIn(true);
    }
  }

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
        confirmLogin(user)})
  }};

  const handleSignOut = evt => {
    fetch('/logout')
      .then((response) => response.text())
      .then((updateLogin) => {
        setUser({});
        setIsLoggedIn(false);
    });
  };

  return (
    <React.Fragment>
      <Navigation user={user} 
                  handleSignOut={evt => handleSignOut(evt)} 
                  loading={loading}
                  isLoggedIn={isLoggedIn} />
      <Routes>
          <Route path="/" element={ <Home user={user} isLoggedIn={isLoggedIn} /> } />
          <Route path="/login" element={ <Login handleLogin={evt => handleLogin(evt)}
                                                updateEmail={evt => updateEmail(evt)}
                                                updatePassword={evt => updatePassword(evt)}
                                                email={email}
                                                password={password}
                                                isLoggedIn={isLoggedIn} 
                                                loading={loading}/> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/search" element={ <Search user={user} loading={loading} /> } />
          <Route path="/search/book_details/:book_id" element={ <BookDetails user={user} 
                                                                isLoggedIn={isLoggedIn} 
                                                                loading={loading}/>} />
          <Route path="/user/:user_id/profile/book_details/:book_id" element={ <BookDetails user={user} 
                                                                                isLoggedIn={isLoggedIn}
                                                                                loading={loading} />} />
          <Route path="/book/:book_id/addReview" element={ <AddReview user={user} loading={loading}/> } />
          <Route path="/book/:book_id/:review_id/editReview" element={ <EditReview user={user} loading={loading}/> } />
          <Route path="/user/:user_id/profile" element={ <UserDetails user={user} loading={loading} isLoggedIn={isLoggedIn}/> } />
          <Route path="/user/:user_id/createshelf" element={ <CreateShelf user={user} loading={loading}/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

