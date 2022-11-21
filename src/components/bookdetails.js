import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams } from 'react-router-dom';
import '../App.css';

const BookDetails = () => {
    // Display details for individual book
    const[bookInfo, setBookInfo] = React.useState({});
    const { book_id } = useParams();

    useEffect(() => {
        fetch(`/book/${book_id}/book_details`)
            .then((response) => response.json())
            .then((dbBook) => {setBookInfo(dbBook)});
    }, []);

    console.log(book_id)

    return (
        <React.Fragment>
            <div>
                <h1>{bookInfo.title}</h1>
                <img src={bookInfo.cover} />
                <p>Description: {bookInfo.overview}</p>
                <p>Publish Date: {bookInfo.publish_date}</p>
            </div>
        </React.Fragment>
    )};


export default BookDetails;