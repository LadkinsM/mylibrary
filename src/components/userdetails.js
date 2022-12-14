import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { UserBookshelfComp } from './usercomps';
import { UserReviewComp } from './reviewcomp';
import { Col, Container, Row } from 'react-bootstrap';
import book_icon from '../images/book_icon.png';

const UserDetails = ({user, loading, isLoggedIn}) => {
    // Display details for User
    const [shelves, setShelves] = React.useState([]);
    const[currentRead, setCurrentRead] = React.useState({})
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/search");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (user.user_id) {
                fetch(`/user/${user.user_id}/currentread`)
                    .then((response) => response.json())
                    .then((bookData) => {
                        setCurrentRead(bookData);
                        updateShelves();
                    });
                }
    }, [user]);

    const updateShelves = () => {
        if (user.user_id) {
            fetch(`/user/${user.user_id}/bookshelves`)
                .then((response) => response.json())
                .then((dbshelves) => {setShelves(dbshelves)});
        }
    }

    return (
        <React.Fragment>
            <Container>
                <Row className='toolbar, current-read'>
                    <Col md={{ span: 12}}>
                        <p className='toolbar_text'>Currently Reading :  
                            {currentRead.book_id !== 'None' ? <Link to={`book_details/${currentRead.book_id}`} className='link'>
                                {currentRead.title} by {currentRead.author}
                            </Link>
                            : <Link className='link' to='/search'> What are you currently reading?</Link>}
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container className='details'>
                <Row>
                    <Col md={{ span: 2 }} className='details_left'>
                        <img src={book_icon} className='book_icon' />
                    </Col>
                    <Col md={{ span: 10 }} className='details_right'>
                        <h2>{user.email}</h2>
                        <p>{user.personal_description}</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <UserBookshelfComp shelves={shelves} 
                                    user={user} 
                                    isLoggedIn={isLoggedIn}
                                    updateShelves = {() => updateShelves()}
                />
            </Container>
            <Container>
                <Row>
                    <Col md={{ span: 12 }} className='toolbar'>
                        <h3 className='toolbar_text'>Reviews</h3>
                    </Col>
                </Row>
            </Container>
            <Container className='review-container'>
                <UserReviewComp user={user} isLoggedIn={isLoggedIn}/>
            </Container>
        </React.Fragment>
    )};


export default UserDetails;