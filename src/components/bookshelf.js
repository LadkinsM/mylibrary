import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import NoImageProvided from '../images/NoImageProvided.png';

const Bookshelves = ({user, books}) => {
    //Display books for selected bookshelf.

    return(
        <React.Fragment>
            <div className="container">
                {books && books.map(book => {
                    return <Link to={`book_details/${book.book_id}`}>
                                <div className="card">
                                <ul key={book.book_id}>
                                    {book.cover !== "Not Provided" ? <img src={book.cover} /> :
                                                                <img src={NoImageProvided} /> }
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