import React from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import '../App.css';

function Navigation({user, handleSignOut, isLoggedIn, loading}) {
  // Display navigation bar

    return (
      <React.Fragment>
        {loading ? (<p>Loading...</p>) : (
        <Container>
          <Row className="nav-container">
            <Col md={{ span: 4, offset: 0}} sm={1}>
              <h3>MyLibrary</h3>
            </Col>
            <Col md={{ span: 8 }} sm={{ span: 1 }} className="header-nav">
              <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className='navigation-bar' key={user}>
                    <Link to="/search" className="nav-link">Search</Link>
                    {isLoggedIn
                      ? <a href="" onClick={handleSignOut} className="nav-link">Logout</a>
                      : <Link to="/login" className="nav-link">Login</Link>
                    }
                    {isLoggedIn
                      && <Link to={`/user/${user.user_id}/profile`} className="nav-link">My Profile</Link>
                    }
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
        )}
      </React.Fragment>
    );
  };

export default Navigation;