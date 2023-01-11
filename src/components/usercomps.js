import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Bookshelves from './bookshelf';
import CreateShelf from './createShelf';
import { Col, Row } from 'react-bootstrap';

export const UserBookComp = ({user, book_id, isLoggedIn}) => {
    // User toolbar (like book, add to bookshelf) for book details page.
    const[shelves, setShelves] = React.useState([])
    const[selectedShelf, setSelectedShelf] = React.useState("")
    const[addConfirmed, setAddConfirmed] = React.useState("")
    const[currentRead, setCurrentRead] = React.useState({})

    useEffect(() => {
        if (user.user_id) {
            fetch(`/user/${user.user_id}/currentread`)
                .then((response) => response.json())
                .then((bookData) => {setCurrentRead(bookData)});
        }
    }, [user]);
    
    useEffect(() => {
        if (user.user_id) {
            fetch(`/user/${user.user_id}/bookshelves`)
                .then((response) => response.json())
                .then((dbshelves) => {setShelves(dbshelves)});
        }
    }, [user]);

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
        fetch(`/user/${user.user_id}/currentread/edit`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userJson)
        })
            .then((response) => response.json())
            .then((bookData) => {setCurrentRead(bookData)});
    };

    const addToShelf = evt => {
        evt.preventDefault();

        fetch(`/bookshelf/addtoshelf/${selectedShelf}/${book_id}`)
            .then((response) => response.text(""))
            .then((addConfirmation) => {setAddConfirmed(addConfirmation)});

        if (addConfirmed === "Failed") {
            alert("This book has already been added to this shelf.");
        } else {
            alert(`This book has been added.`);
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col md={{ span: 4, offset: 0 }} sm={1}>
                    {book_id !== `${currentRead.book_id}` ? <button className="toolbar_button" value="add" onClick={updateCurrentRead}>Set as Current Read</button>
                                    : <button className="toolbar_button" value="remove" onClick={updateCurrentRead}>Remove as Current Read</button>}
                </Col>
                <Col md={{ span: 8 }} sm={1} className='toolbar-right-col'>
                    <form id="add_to_shelf" onSubmit={addToShelf}>
                        <label for="select_shelf" className='select_spacing'>Add to bookshelf?</label>
                        <select
                            className="toolbar_button"
                            id="select_shelf"
                            value={selectedShelf}
                            onChange={updateShelf}
                            >
                            {shelves.map(shelf => {
                                return <option key={shelf.shelf_id} value={shelf.shelf_id}>{shelf.name}</option>
                            })}
                        </select>
                        <input type="submit" className="toolbar_button"/>
                    </form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export const UserBookshelfComp = ({user, shelves, isLoggedIn, updateShelves}) => {
    // User toolbar (create bookshelf, select bookshelf) for user details page.

    const[selectedShelf, setSelectedShelf] = React.useState("None")
    const[books, setBooks] = React.useState([]);
    const[showCreateShelfModal, setShowCreateShelfModal] = React.useState(false);

    useEffect(() => {
        if (user.user_id && selectedShelf !== "None") {
            fetch(`/user/${user.user_id}/bookshelves/${selectedShelf}`)
                .then((response) => response.json())
                .then((dbShelf) => {setBooks(dbShelf);
                console.log(books);});
        } else {
            setBooks([])
        }
    }, [selectedShelf]);

    const updateShelf = evt => {
        if (evt.target.value !== "None") {
            setSelectedShelf(evt.target.value);}
    };

    const handleShow = evt => {setShowCreateShelfModal(true)};
    const handleClose = evt => {
        setShowCreateShelfModal(false);
        updateShelves();
    };

    return (
        <React.Fragment>
            <Row className='toolbar'>
                <Col md={{ span: 6 }}>
                    <h3 className='toolbar_text'>Bookshelves</h3>
                </Col>
                <Col md={{ span: 6 }} className='toolbar-right-col'>
                    {isLoggedIn !== false && <Button onClick={handleShow} className='toolbar_button'>Create New Shelf</Button>}
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
                                <CreateShelf user={user} 
                                            shelves={shelves} 
                                            handleClose={evt => handleClose(evt)}
                                />
                            </Modal.Body>
                        </Modal>
                    <select
                        className='toolbar_button'
                        id='select_shelf'
                        value={selectedShelf}
                        onChange={updateShelf}
                        >
                        <option key="None" value="None">Select Shelf</option>
                        {shelves.map(shelf => {
                            return <option key={shelf.shelf_id} value={shelf.shelf_id}>{shelf.name}</option>
                        })}
                    </select>
                </Col>
            </Row>
            <Row className='bookshelf-container'>
                {books.length===0 && selectedShelf !== "None" ? 
                    <Link to='/search' className='empty-shelf'>I'm an empty shelf! Head to search to add books!</Link> :
                    books.length===0 && selectedShelf === "None" ? 
                    <p className='empty-shelf'>Select a bookshelf to view it's contents!</p> :
                    <Bookshelves user={user} books={books} /> }
            </Row>
        </React.Fragment>
    )
}