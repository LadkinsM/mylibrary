import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';

const Bookshelves = ({user, books}) => {
    // const user_id = props.user_id;
    // const shelf = props.selectedShelf; 
    // const books = props.books;
    // const[books, setBooks] = React.useState([]);
    // const { user_id } = useParams();

    // useEffect(() => {
    //     fetch(`/user/${userInfo.user_id}/bookshelves/${selectedShelf}`)
    //         .then((response) => response.json())
    //         .then((dbShelf) => {setBooks(dbShelf);
    //         console.log(books);});
    // }, []);

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