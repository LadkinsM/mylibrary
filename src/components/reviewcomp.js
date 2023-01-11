import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Col, Row } from 'react-bootstrap';

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

    if (addSuccess === "Success") {
        return navigate(`/search/book_details/${book_id}`)
    } else {
        return (
            <React.Fragment>
                <form id="addreview" onSubmit={addReview}>
                    <Row>
                        <Col md={12}>
                            <label htmlFor="comment">Comment (500 Characters or less):</label>
                        </Col>
                        <Col md={12}>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8}>
                            <label htmlFor="score">Score:</label>
                            <input
                                type="number"
                                id="number_input"
                                min="0"
                                max="5"
                                value={score}
                                onChange={updateScore}
                            />
                        </Col>
                        <Col md={4}>
                            <input type="submit" />
                        </Col>
                    </Row>
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
            <form id="editreview" onSubmit={editReview}>
                <Row>
                    <Col md={12}>
                        <label htmlFor="comment">Comment (500 Characters or less):</label>
                    </Col>
                    <Col md={12}>
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
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <label htmlFor="score">Score:</label>
                        <input
                            type="number"
                            id="number_input"
                            min="0"
                            max="5"
                            defaultValue={originalReview.score}
                            onChange={updateScore}
                        />
                    </Col>
                    <Col md={4}>
                        <input type="submit" />
                    </Col>
                </Row>
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
            <div>
                {reviews && reviews.map(review => {
                    return <div className='review'>
                                <Row>
                                    <Col md={{ span: 8 }} className='toolbar-left-col'>
                                        <h4>{review.title}</h4>
                                    </Col>
                                    <Col md={{ span: 4 }} className='toolbar-right-col'>
                                        {(review.user_id === user.user_id && isLoggedIn !== false) && 
                                                    <Button onClick={() => handleShow(review.review_id)} className='toolbar_button'>Edit Review</Button>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p>Score: {review.score}</p>
                                        <p>{review.comment}</p>
                                    </Col>
                                </Row>
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
            <Modal
                className='modal_custom'
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
                                <Row>
                                    <Col md={{ span: 8 }} className='toolbar-left-col'>
                                        <h4>{review.username} says...</h4>
                                    </Col>
                                    <Col md={{ span: 4 }} className='toolbar-right-col'>
                                        {(review.user_id === user.user_id && isLoggedIn !== false) && 
                                                <Button onClick={() => handleShow(review.review_id)} className='toolbar_button'>Edit Review</Button>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p>Score: {review.score}</p>
                                        <p>{review.comment}</p>
                                    </Col>
                                </Row>
                            </div>
                })}
            </div>
        </React.Fragment>
    )
}