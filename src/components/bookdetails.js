import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {UserBookComp} from './usercomps';
import { BookReviewComp, AddReview } from './reviewcomp';
import NoImageProvided from '../images/NoImageProvided.png';
import { Col, Container, Row } from 'react-bootstrap';


const BookDetails = ({user, isLoggedIn}) => {
    // Display details for individual book
    const[bookInfo, setBookInfo] = React.useState({});
    const[showReviewModal, setShowReviewModal] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    const { book_id } = useParams();

    useEffect(() => {
        fetch(`/book/${book_id}/book_details`)
            .then((response) => response.json())
            .then((dbBook) => {setBookInfo(dbBook);
            console.log("Book Info Set");});
    }, []);

    useEffect(() => {getReviewsByBook()}, []);

    const getReviewsByBook = () => {
        fetch(`/book/${book_id}/reviews`)
            .then((response) => response.json())
            .then((reviewData) => {
                if (reviewData) {
                    setReviews(reviewData)}
            })
    };

    const handleShow = evt => {setShowReviewModal(true)};
    const handleClose = evt => {setShowReviewModal(false)};

    return (
        <React.Fragment>
            <Container>
                {isLoggedIn !== false && <UserBookComp user={user} 
                                                        book_id={book_id} 
                                                        isLoggedIn={isLoggedIn} 
                                                        />}
            </Container>
            <Container>
                <Row id='cover-row'>
                    <Col md={{ span:2, offset: 0}} sm={1} id='cover-container'>
                        {bookInfo.cover !== "Not Provided" ? <img src={bookInfo.cover} /> : 
                                <img src={NoImageProvided} /> }
                    </Col>
                    <Col md={{ span:10 }} sm={1}>
                        <h3>{bookInfo.title}</h3>
                        <p>{bookInfo.authors}</p>
                        <p>{bookInfo.genres}</p>
                        <p>{bookInfo.overview}</p>
                        <p>Publish Date: {bookInfo.publish_date}</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={{ span: 6 }}>
                        <h3>Reviews</h3>
                    </Col>
                    <Col md={{ span: 6 }} className='toolbar-right-col'>
                        {isLoggedIn !== false && <Button onClick={handleShow}>Add a Review</Button>}
                    </Col>
                </Row>
                    <Modal
                        show={showReviewModal}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton onClick={handleClose}>
                            <Modal.Title>Enter your review below!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddReview user={user} 
                                        book_id={book_id} 
                                        handleClose={evt => handleClose(evt)}/>
                        </Modal.Body>
                    </Modal>
            </Container>
            <Container className='review-container'>
                <BookReviewComp user={user} 
                                book_id={book_id} 
                                isLoggedIn={isLoggedIn} 
                                reviews={reviews}
                />
            </Container>
        </React.Fragment>
    )};

export default BookDetails;