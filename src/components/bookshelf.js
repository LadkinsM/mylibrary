import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';

const Bookshelves = (props) => {
    const user_id = props.user_id;
    const shelf = props.selectedShelf; 
    const[books, setBooks] = React.useState([]);

    const fetchShelf = evt => {
        evt.preventDefault()
        fetch(`/user/${user_id}/bookshelves/${shelf.id}`)
            .then((response) => response.json())
            .then((dbShelf) => {setBooks(dbShelf)});
    }

    return(
        <React.Fragment>
            <section id="bookshelf">
                
            </section>
        </React.Fragment>
    )
};

export default Bookshelves;