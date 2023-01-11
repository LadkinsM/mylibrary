import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import App from '../App';
import '../App.css';
import { Col, Container, Row } from 'react-bootstrap';

const Login = ({handleLogin, updateEmail, updatePassword, isLoggedIn}) => {
  //User Login Page

  const navigate = useNavigate();

  if (isLoggedIn == true) {
    return navigate(`/search`)
  } else {
    return (
      <React.Fragment>
        <Container className='login_container'>
          <Row className='login_header'>
            <h2>Login</h2>
          </Row>
          <Row className='login_row'>
            <form id="login" onSubmit={handleLogin}>
                <Col md={{ span: 12 }} className='login_form'>
                  <label htmlFor="email" className='login_input'>User Email:</label>
                  <input 
                    type="text"
                    name="email"
                    id="user_email"
                    onChange={updateEmail}
                  />
                  <label htmlFor="password" className='login_input'>Password:</label>
                  <input
                    type="text"
                    name="password"
                    id="user_password"
                    onChange={updatePassword}
                  />
                  <input type="submit" className='login_input toolbar_button'/>
                </Col>
              </form>
            </Row>
          <Link to="/signup" className='link toolbar_button'>No account? Click here to sign up!</Link>
        </Container>
      </React.Fragment>
    );
  };
}

export default Login;
