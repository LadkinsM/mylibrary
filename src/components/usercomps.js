import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';
import Bookshelves from './bookshelf';

export const UserBookComp = ({user, book_id, isLoggedIn}) => {
    // User toolbar (like book, add to bookshelf) for book details page.
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
        fetch(`/user/${user.user_id}/bookshelves`)
            .then((response) => response.json())
            .then((dbshelves) => {setShelves(dbshelves)});
    }, []);
    
    console.log(`/user/${user.user_id}/bookshelves`);
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
                        return <option key={shelf.shelf_id} value={shelf.shelf_id}>{shelf.name}</option>
                    })}
                </select>
                <input type="submit" />
            </form>
        </React.Fragment>
    )
}

export const UserBookshelfComp = ({user, shelves}) => {
    // User toolbar (create bookshelf, select bookshelf) for user details page.
    const[selectedShelf, setSelectedShelf] = React.useState("")
    const[books, setBooks] = React.useState([]);

    const fetchShelf = () => {
        fetch(`/user/${user.user_id}/bookshelves/${selectedShelf}`)
            .then((response) => response.json())
            .then((dbShelf) => {setBooks(dbShelf);
            console.log(books)});
    }

    // useEffect(() => {
    //     fetch(`/user/${user.user_id}/bookshelves/${selectedShelf}`)
    //         .then((response) => response.json())
    //         .then((dbShelf) => {setBooks(dbShelf);
    //         console.log(books)});
    // }, []);

    const updateShelf = evt => {
        setSelectedShelf(evt.target.value);
        fetchShelf();
    };

    return (
        <React.Fragment>
            <h3>Bookshelves</h3>
            <Link to={`/user/${user.user_id}/createshelf`}>Create New Bookshelf</Link>
            <select
                id="select_shelf"
                value={selectedShelf}
                onChange={updateShelf}
                >
                <option key="None">Select Shelf</option>
                {shelves.map(shelf => {
                    return <option key={shelf.shelf_id} value={shelf.shelf_id}>{shelf.name}</option>
                })}
            </select>
            <div>
                <Bookshelves user={user} books={books} />
            </div>
        </React.Fragment>
    )
}