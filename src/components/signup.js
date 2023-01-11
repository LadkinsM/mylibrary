import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Col, Container, Row } from 'react-bootstrap';

const SignUp = () => {
    //User sign up page.

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
                .then((userData) => {
                if (userData.alert) {
                    alert("That user already exists.")
                } else {
                    alert("Your account has been created, please log in.")
                    setUser(userData);
                }});
            }}


    if (user.user_id) {
        return navigate(`/login`)
    } else {
        return (
            <React.Fragment>
                <Container className='login_container'>
                    <Row className='login_header'>
                        <h2>Sign Up</h2>
                    </Row>
                    <Row className='login_row'>
                        <form id="signup" onSubmit={handleSignUp}>
                            <Col md={{ span: 12 }} className='login_form'>
                                <label htmlFor="email" className='login_input'>User Email:</label>
                                <input 
                                    type="text"
                                    name="email"
                                    id="user_email"
                                    value={email}
                                    onChange={updateEmail}
                                />
                                <label htmlFor="password" className='login_input'>Password:</label>
                                <input
                                    type="text"
                                    name="password"
                                    id="user_password"
                                    value={password}
                                    onChange={updatePassword}
                                />
                                <input type="submit" className='login_input toolbar_button'/>
                            </Col>
                        </form>
                    </Row>
                </Container>
            </React.Fragment>
        )}
}
export default SignUp;