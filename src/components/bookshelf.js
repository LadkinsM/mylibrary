import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';

const Bookshelves = ({user, books}) => {

    return(
        <React.Fragment>
            <div className="container">
                {books && books.map(book => {
                    return <Link to={`book_details/${book.book_id}`}>
                                <div className="card">
                                <ul key={book.book_id}>
                                    {book.cover ? <img src={book.cover} />:<p>Image Not Available</p>}
                                    <li>Title: {book.title}</li>
                                    <li>Author: {book.authors}</li>
                                    <li>Published Date: {book.publish_date}</li>
                                </ul>
                                </div>
                            </Link>
                })}
            </div>
        </React.Fragment>
    )
};

export default Bookshelves;