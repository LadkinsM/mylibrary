import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { Col, Container } from 'react-bootstrap';


const Home = ({user, isLoggedIn}) => {
    //Not in use. Homepage, navigates to search. 

    return (
        <React.Fragment>
            <Container id='home-container'>
                <Col id='home-column'>
                    <h1 id='home-header'>myLibrary</h1>
                    <p id='home-para'>
                        Designed to help you manage your dream library.
                    </p>
                </Col>
            </Container>
        </React.Fragment>
    )
};

export default Home;