import React, { useEffect, useInsertionEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link, useNavigate } from 'react-router-dom';
import '../App.css';

export const AddReview = ({user, isLoggedIn, book_id}) => {
    const [score, setScore] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [addSuccess, setAddSuccess] = React.useState("");

    const navigate = useNavigate();

    const updateScore = evt => {
        setScore(evt.target.value);
    };

    const updateComment = evt => {
        setComment(evt.target.value);
    };

    const addReview = evt => {
        evt.preventDefault()
        const reviewJSON = {
            'user_id':user.user_id,
            'book_id':book_id,
            'score':score,
            'comment':comment
        };

        if (score === "" || comment === "") {
            alert("Please complete both the score and comment sections.")
        } else {
            fetch(`/book/${book_id}/reviews/add`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(reviewJSON)
            })
                .then((response) => response.text(""))
                .then((addConfirmation) => {setAddSuccess(addConfirmation)})
        }};

    if (addSuccess == "Success") {
        return navigate(`/book_details/${book_id}`)
    } else {
        return (
            <React.Fragment>
                <h3>Create Review</h3>
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

export const UserReviewComp = ({user, isLoggedIn}) => {
    return (<><p>Hello</p></>)
}

export const BookReviewComp = ({user, isLoggedIn, book_id}) => {
    const [reviews, setReviews] = React.useState([]);

    useEffect(() => {
        fetch(`/book/${book_id}/reviews`)
            .then((response) => response.json())
            .then((reviewData) => {setReviews(reviewData)})
    });

    return (
        <React.Fragment>
            <h2>Reviews</h2>
            <div className="reviews">
                {reviews && reviews.map(review => {
                    return <div className="review">
                                <h3>{review.username} says...</h3>
                                <p>Score: {review.score}</p>
                                <p>{review.comment}</p>
                            </div>
                })}
            </div>
        </React.Fragment>
    )
}