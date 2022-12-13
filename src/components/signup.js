import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.css';

const SignUp = () => {
    const[email, setEmail] = React.useState("");
    const[password, setPassword] = React.useState("");
    const[user, setUser] = React.useState({});
    const navigate = useNavigate();

    const updateEmail = evt => {
        setEmail(evt.target.value);
    };

    const updatePassword = evt => {
        setPassword(evt.target.value);
    };

    const handleSignUp = evt => {
        evt.preventDefault()
        const userJson = { 'email':email, 'password':password};

        if (email === "" || password === "") {
            alert("Please enter both email and password.")
        } else {
            fetch('/signup', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(userJson)
            })
                .then((response) => response.json())
                .then((userData) => {setUser(userData);
                {user.user_id !== undefined ? alert("You've successfully created an account, please log in!"): alert("That user already exsists.")}});
            }}


    if (user.user_id) {
        return navigate(`/login`)
    } else {
        return (
            <React.Fragment>
                <h1>Sign Up</h1>
                <form id="signup" onSubmit={handleSignUp}>
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
        )}
}
export default SignUp;