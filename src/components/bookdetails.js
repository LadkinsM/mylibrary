import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {UserBookComp} from './usercomps';
import { BookReviewComp, AddReview } from './reviewcomp';

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
            .then((reviewData) => {setReviews(reviewData)})
    };

    const handleShow = evt => {setShowReviewModal(true)};
    const handleClose = evt => {setShowReviewModal(false)};

    return (
        <React.Fragment>
            <div>
                {isLoggedIn !== false && <UserBookComp user={user} book_id={book_id} isLoggedIn={isLoggedIn} />}
            </div>
            <div>
                <h1>{bookInfo.title}</h1>
                <img src={bookInfo.cover} />
                {/* <p>Authors: {bookInfo.authors.map(author => {return <p>{author.name}</p>})}</p> */}
                <p>Authors: {bookInfo.authors}</p>
                <p>Genres: {bookInfo.genres}</p>
                <p>Description: {bookInfo.overview}</p>
                <p>Publish Date: {bookInfo.publish_date}</p>
            </div>
            <div>
                {isLoggedIn !== false && <Button onClick={handleShow}>Add a Review</Button>}
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
                            <AddReview user={user} book_id={book_id} handleClose={evt => handleClose(evt)}/>
                        </Modal.Body>
                    </Modal>
                <BookReviewComp user={user} 
                                book_id={book_id} 
                                isLoggedIn={isLoggedIn} 
                                reviews={reviews}
                />
            </div>
        </React.Fragment>
    )};

export default BookDetails;