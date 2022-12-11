import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {UserBookComp} from './usercomps';
import { BookReviewComp } from './reviewcomp';

const BookDetails = ({user, isLoggedIn}) => {
    // Display details for individual book
    const[bookInfo, setBookInfo] = React.useState({});
    const { book_id } = useParams();
    // const[userInfo, setUserInfo] = React.useState({});

    // useEffect(() => {
    //     fetch(`/user/${user.user_id}/user_details`)
    //         .then((response) => response.json())
    //         .then((dbUser) => {setUserInfo(dbUser)});
    // }, []);

    useEffect(() => {
        fetch(`/book/${book_id}/book_details`)
            .then((response) => response.json())
            .then((dbBook) => {setBookInfo(dbBook)});
    }, []);

    return (
        <React.Fragment>
            <div>
                {isLoggedIn !== false && <UserBookComp user={user} book_id={book_id} isLoggedIn={isLoggedIn} />}
            </div>
            <div>
                <h1>{bookInfo.title}</h1>
                <img src={bookInfo.cover} />
                <p>Description: {bookInfo.overview}</p>
                <p>Publish Date: {bookInfo.publish_date}</p>
            </div>
            <div>
                {isLoggedIn !== false && <Link to={`/book/${book_id}/addReview`}>Add a Review</Link>}
                <BookReviewComp user={user} book_id={book_id} isLoggedIn={isLoggedIn} />
            </div>
        </React.Fragment>
    )};

    // return (
    //     <Modal size="lg" centered>
    //         <Modal.Header closeButton>
    //             <Modal.Title>{bookInfo.title}</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //             <img src={bookInfo.cover} />
    //             <p>Description: {bookInfo.overview}</p>
    //             <p>Publish Date: {bookInfo.publish_date}</p>
    //         </Modal.Body>
    //         <Modal.Footer>
    //             {user !== "False" && <UserBookComp user={user} book_id={book_id} />}
    //         </Modal.Footer>
    //     </Modal>
    // )};

export default BookDetails;