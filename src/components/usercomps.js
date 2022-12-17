import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Bookshelves from './bookshelf';
import CreateShelf from './createShelf';

export const UserBookComp = ({user, book_id, isLoggedIn}) => {
    // User toolbar (like book, add to bookshelf) for book details page.
    const[shelves, setShelves] = React.useState([])
    const[selectedShelf, setSelectedShelf] = React.useState("")
    const[addConfirmed, setAddConfirmed] = React.useState("")
    const[currentRead, setCurrentRead] = React.useState({})
    // const[likedBook, setLikedBook] = React.useState(false)

    useEffect(() => {
        fetch(`/user/${user.user_id}/currentread`)
            .then((response) => response.json())
            .then((bookData) => {setCurrentRead(bookData)});
    }, [user]);

    // useEffect(() => {
    //     fetch(`/user/${user.user_id}/likedbooks/${book_id}`)
    //         .then((response) => response.ok())
    //         .then((response) => {setLikedBook(response)});
    // }, [user]);

    const updateShelf = evt => {
        setSelectedShelf(evt.target.value);
        addToShelf();
    };

    const updateCurrentRead = evt => {
        let userJson;

        if (evt.target.value === "add") {
            userJson = {'user_id':user.user_id, 'book_id':book_id};
        } else {
            userJson = {'user_id':user.user_id, 'book_id':"Remove"};
        };

        editCurrentRead(userJson);
    };

    const editCurrentRead = (userJson) => { 

        console.log(userJson)

        fetch(`/user/${user.user_id}/currentread/edit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userJson)
        })
            .then((response) => response.json())
            .then((bookData) => {setCurrentRead(bookData)});
    };

    const addToShelf = evt => {
        evt.preventDefault()

        fetch(`/bookshelf/addtoshelf/${selectedShelf}/${book_id}`)
            .then((response) => response.text(""))
            .then((addConfirmation) => {setAddConfirmed(addConfirmation)});

        if (addConfirmed === "Failed") {
            alert("This book has already been added to this shelf.");
        } else {
            alert(`This book has been added.`);
        }
    };

    // const addToLikedBooks = evt => {
    //     evt.preventDefault()

    //     //Create fetch request to add book to liked books shelf.
    //     //should update button to reflect added to liked books shelf.
    // }

    useEffect(() => {
        fetch(`/user/${user.user_id}/bookshelves`)
            .then((response) => response.json())
            .then((dbshelves) => {setShelves(dbshelves)});
    }, []);


    return (
        <React.Fragment>
            <div>
                {book_id !== `${currentRead.book_id}` ? <button id="button" value="add" onClick={updateCurrentRead}>Set as Current Read</button>
                                : <button id="button" value="remove" onClick={updateCurrentRead}>Remove as Current Read</button>}
            </div>
            <div>
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
            </div>
        </React.Fragment>
    )
}

export const UserBookshelfComp = ({user, shelves, isLoggedIn}) => {
    // User toolbar (create bookshelf, select bookshelf) for user details page.
    const[selectedShelf, setSelectedShelf] = React.useState("None")
    const[books, setBooks] = React.useState([]);
    const[showCreateShelfModal, setShowCreateShelfModal] = React.useState(false);

    useEffect(() => {
        if (user.user_id && selectedShelf !== "Select Shelf") {
            fetch(`/user/${user.user_id}/bookshelves/${selectedShelf}`)
                .then((response) => response.json())
                .then((dbShelf) => {setBooks(dbShelf);
                console.log(books);});
        } else {
            setBooks([])
        }
    }, [selectedShelf]);

    const updateShelf = evt => {
        if (evt.target.value != "None") {
            setSelectedShelf(evt.target.value);}
    };

    const handleShow = evt => {setShowCreateShelfModal(true)};
    const handleClose = evt => {setShowCreateShelfModal(false)};

    return (
        <React.Fragment>
            <h3>Bookshelves</h3>
            {isLoggedIn !== false && <Button onClick={handleShow}>Create New Shelf</Button>}
                <Modal
                    show={showCreateShelfModal}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title>Create a new shelf below!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateShelf user={user} shelves={shelves} handleClose={evt => handleClose(evt)} />
                    </Modal.Body>
                </Modal>
            <select
                id="select_shelf"
                value={selectedShelf}
                onChange={updateShelf}
                >
                <option key="None" value="None">Select Shelf</option>
                {shelves.map(shelf => {
                    return <option key={shelf.shelf_id} value={shelf.shelf_id}>{shelf.name}</option>
                })}
            </select>
            <div>
            {books.length==0 && selectedShelf !== "None" ? <Link to='/search'>I'm an empty shelf! Head to search to add books!</Link> : 
                <Bookshelves user={user} books={books} /> }
            </div>
        </React.Fragment>
    )
}