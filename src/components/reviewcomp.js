import React, { useEffect, useInsertionEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const AddReview = ({user, book_id, handleClose}) => {
    //Add a new review, accessed via bookdetails page.
    const [score, setScore] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [addSuccess, setAddSuccess] = React.useState("");
    const navigate = useNavigate();

    const updateScore = evt => {setScore(evt.target.value)};
    const updateComment = evt => {setComment(evt.target.value)};

    const addReview = evt => {
        const reviewJSON = {
            'user_id':user.user_id,
            'book_id':book_id,
            'score':score,
            'comment':comment
        };

        if (score === "" || comment === "") {
            alert("Please complete both the score and comment sections.")
        } else {
            fetch(`/book/${book_id}/review`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(reviewJSON)
            })
                .then((response) => response.text(""))
                .then((addConfirmation) => {setAddSuccess(addConfirmation)})
                handleClose();
        }};

    if (addSuccess == "Success") {
        return navigate(`/search/book_details/${book_id}`)
    } else {
        return (
            <React.Fragment>
                <form id="addreview" onSubmit={addReview}>
                    <div>
                        <label htmlFor="score">Score:</label>
                        <input
                            type="number"
                            id="number_input"
                            min="0"
                            max="5"
                            value={score}
                            onChange={updateScore}
                        />
                        <label htmlFor="comment">Comment (500 Characters or less):</label>
                        <textarea
                            id="text_input"
                            maxLength="500"
                            wrap="hard"
                            rows="10"
                            cols="50"
                            spellCheck="true"
                            value={comment}
                            onChange={updateComment}
                        >
                        Insert Review Here...
                        </textarea>
                        <input type="submit" />
                    </div>
                </form>
            </React.Fragment>
        )
    }
}


export const EditReview = ({user, book_id, review_id, handleClose}) => {
    //Edit an exsisting review, accessed via bookdetails & userdetails pages.
    const [score, setScore] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [addSuccess, setAddSuccess] = React.useState("");
    const [originalReview, setOriginalReview] = React.useState({});

    useEffect(() => {
        fetch(`/user/${user.user_id}/${review_id}`)
            .then((response) => response.json())
            .then((reviewData) => {setOriginalReview(reviewData)});
    }, []);

    const updateScore = evt => {setScore(evt.target.value)};

    const updateComment = evt => {setComment(evt.target.value)};

    const editReview = evt => {
        const reviewJSON = {
            'review_id':originalReview.review_id,
            'user_id':user.user_id,
            'book_id':book_id,
            'score':score,
            'comment':comment
        }; 
        if (score === "" || comment === "") {
            alert("Please complete both the score and comment sections.")
        } else {
            fetch(`/user/${user.user_id}/${originalReview.review_id}/edit`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(reviewJSON)
            })
                .then((response) => response.text(""))
                .then((addConfirmation) => {setAddSuccess(addConfirmation)})
                handleClose();
        }};
    
    return (
        <React.Fragment>
            <h3>Edit Review</h3>
            <form id="editreview" onSubmit={editReview}>
                <div>
                    <label htmlFor="score">Score:</label>
                    <input
                        type="number"
                        id="number_input"
                        min="0"
                        max="5"
                        defaultValue={originalReview.score}
                        onChange={updateScore}
                    />
                    <label htmlFor="comment">Comment (500 Characters or less):</label>
                    <textarea
                        id="text_input"
                        maxLength="500"
                        wrap="hard"
                        rows="10"
                        cols="50"
                        spellCheck="true"
                        defaultValue={originalReview.comment}
                        onChange={updateComment}
                    />
                    <input type="submit" />
                </div>
            </form>
        </React.Fragment>
    ) 
}


export const UserReviewComp = ({user, isLoggedIn}) => {
    // Displays reviews by user on user details page.
    const [reviews, setReviews] = React.useState([]);
    const[showReviewModal, setShowReviewModal] = React.useState(false);
    const[currentReview, setCurrentReview] = React.useState({});
    
    useEffect(() => {
        if (user.user_id) {
            fetch(`/user/${user.user_id}/reviews`)
                .then((response) => response.json())
                .then((dbreviews) => {setReviews(dbreviews)});
        }
    }, [user]);

    const handleShow = (review_id) => {
        setShowReviewModal(true);
        setCurrentReview(review_id);
    };

    const handleClose = evt => {setShowReviewModal(false)};

    return (
        <React.Fragment>
            <h2>Reviews</h2>
            <Modal
                show={showReviewModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Edit your review below!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditReview user={user}
                        book_id={currentReview.book_id}
                        review_id={currentReview}
                        handleClose={evt => handleClose(evt)}
                    />
                </Modal.Body>
            </Modal>
            <div className="reviews">
                {reviews && reviews.map(review => {
                    return <div className="review">
                            {(review.user_id === user.user_id && isLoggedIn !== false) && 
                                        <Button onClick={() => handleShow(review.review_id)}>Edit Review</Button>}
                                <h3>{review.title}</h3>
                                <p>Score: {review.score}</p>
                                <p>{review.comment}</p>
                            </div>
                })}
            </div>
        </React.Fragment>
    )
}


export const BookReviewComp = ({user, isLoggedIn, book_id, reviews}) => {
    //Display reviews by book on book details page.
    const[showReviewModal, setShowReviewModal] = React.useState(false);
    const[currentReview, setCurrentReview] = React.useState({});

    const handleShow = (review_id) => {
        setShowReviewModal(true);
        setCurrentReview(review_id);
    };

    const handleClose = evt => {setShowReviewModal(false)};

    return (
        <React.Fragment>
            <h2>Reviews</h2>
            <Modal
                show={showReviewModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>Edit your review below!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditReview user={user}
                        book_id={book_id}
                        review_id={currentReview}
                        handleClose={evt => handleClose(evt)}
                    />
                </Modal.Body>
            </Modal>
            <div className="reviews">
                {reviews && reviews.map(review => {
                    return <div className="review">
                                {(review.user_id === user.user_id && isLoggedIn !== false) && 
                                        <Button onClick={() => handleShow(review.review_id)}>Edit Review</Button>}
                                <h3>{review.username} says...</h3>
                                <p>Score: {review.score}</p>
                                <p>{review.comment}</p>
                            </div>
                })}
            </div>
        </React.Fragment>
    )
}