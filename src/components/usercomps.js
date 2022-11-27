import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';
import Bookshelves from './bookshelf';

export const UserBookComp = (props) => {
    // User toolbar (like book, add to bookshelf) for book details page.
    const user = props.user
    const book_id = props.book_id
    const [shelves, setShelves] = React.useState([])
    const[selectedShelf, setSelectedShelf] = React.useState("")
    const[addConfirmed, setAddConfirmed] = React.useState("")

    const updateShelf = evt => {
        setSelectedShelf(evt.target.value);
        addToShelf();
    };

    const addToShelf = evt => {
        evt.preventDefault()

        fetch(`/bookshelf/addtoshelf/${selectedShelf}/${book_id}`)
            .then((response) => response.text(""))
            .then((addConfirmation) => {setAddConfirmed(addConfirmation)});

        if (addConfirmed == "Failed") {
            alert("This book has already been added.");
        } else {
            alert(`This book has been added.`);
        }
    };

    useEffect(() => {
        fetch(`/user/${user}/bookshelves`)
            .then((response) => response.json())
            .then((dbshelves) => {setShelves(dbshelves)});
    }, []);
    
    console.log(`/user/${user}/bookshelves`);
    console.log(shelves);

    return (
        <React.Fragment>
            <form id="add_to_shelf" onSubmit={addToShelf}>
                <select
                    id="select_shelf"
                    value={selectedShelf}
                    onChange={updateShelf}
                    >
                    {shelves.map(shelf => {
                        return <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                    })}
                </select>
                <input type="submit" />
            </form>
        </React.Fragment>
    )
}

export const UserBookshelfComp = (props) => {
    // User toolbar (create bookshelf, select bookshelf) for user details page.
    const user_id = props.user_id
    const shelves = props.shelves
    const[selectedShelf, setSelectedShelf] = React.useState("")
    const[books, setBooks] = React.useState([]);

    const fetchShelf = () => {
        fetch(`/user/${user_id}/bookshelves/${selectedShelf}`)
            .then((response) => response.json())
            .then((dbShelf) => {setBooks(dbShelf)});
    }

    const updateShelf = evt => {
        setSelectedShelf(evt.target.value);
        fetchShelf();
    };
    console.log(selectedShelf);
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
            <Bookshelves user_id={user_id} books={books} />
        </React.Fragment>
    )
}