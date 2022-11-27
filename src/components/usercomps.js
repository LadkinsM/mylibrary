import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';
import Bookshelves from './bookshelf';

export const UserBookComp = (props) => {
    // User toolbar (like book, add to bookshelf) for book details page.
    return (
        <React.Fragment>
            <h3>User Book Component</h3>
        </React.Fragment>
    )
}

export const UserBookshelfComp = (props) => {
    // User toolbar (create bookshelf, select bookshelf) for user details page.
    const user_id = props.user_id
    const shelves = props.shelves
    const[selectedShelf, setSelectedShelf] = React.useState("")

    const updateShelf = evt => {
        setSelectedShelf(evt.target.value);
    };

    return (
        <React.Fragment>
            <h3>Bookshelves</h3>
            <Link to={`/user/${user_id}/createshelf`}>Create New Bookshelf</Link>
            <select
                id="select_shelf"
                value={selectedShelf}
                onChange={updateShelf}
                >
                {shelves.map(shelf => {
                    return <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                })}
            </select>
            <Bookshelves selectedShelf={selectedShelf} user_id={user_id}/>
        </React.Fragment>
    )
}