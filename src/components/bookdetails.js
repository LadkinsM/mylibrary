import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams } from 'react-router-dom';
import '../App.css';
import {UserBookComp} from './usercomps';

const BookDetails = () => {
    // Display details for individual book
    const[bookInfo, setBookInfo] = React.useState({});
    const { book_id } = useParams();
    const[user, setUser] = React.useState({});

    useEffect(() => {
        fetch('/user')
        .then((response) => response.text())
        .then((user_id) => {setUser(user_id)});
    }, []);

    const loggedIn = () => {
        if (user == "False") {
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        fetch(`/book/${book_id}/book_details`)
            .then((response) => response.json())
            .then((dbBook) => {setBookInfo(dbBook)});
    }, []);

    

    return (
        <React.Fragment>
            <div>
                {user !== "False" && <UserBookComp user={user} book_id={book_id} />}
            </div>
            <div>
                <h1>{bookInfo.title}</h1>
                <img src={bookInfo.cover} />
                <p>Description: {bookInfo.overview}</p>
                <p>Publish Date: {bookInfo.publish_date}</p>
            </div>
        </React.Fragment>
    )};


export default BookDetails;