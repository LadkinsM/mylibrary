import React from 'react';
import '../App.css';
import { Col, Row } from 'react-bootstrap';

const CreateShelf = ({user, handleClose, shelves}) => {
    //Create Bookshelf Component
    
    const [shelfName, setShelfName] = React.useState("");
    const [privacy, setPrivacy] = React.useState(false);
    const [createSuccess, setCreateSuccess] = React.useState("");

    const updateShelfName = evt => {
        setShelfName(evt.target.value);
    }

    const updateShelfPrivacy = evt => {
        setPrivacy(!privacy);
    }

    const handleCreateShelf = evt => {
        evt.preventDefault();
        const shelfJson = {'name':shelfName, 'private':privacy, 'user_id':user.user_id}

        if (shelfName === "") {
            alert("Please enter a name for your Bookshelf.")
        } else {
            fetch('/bookshelf/createshelf', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(shelfJson)
            }) 
                .then((response) => response.text())
                .then((shelfData) => {
                    if (shelfData === "Success") {
                        setCreateSuccess(shelfData);
                        handleClose();
                    } else {
                        alert("A Bookshelf by that name already exists.")
                    }})
        }};
    

        return (
            <React.Fragment>
                <form id="createshelf" onSubmit={handleCreateShelf}>
                    <Row>
                        <Col md={4}>
                            <label htmlFor="shelf_name">Bookshelf Name:</label>
                        </Col>
                        <Col md={8}>
                            <input
                                className='modal_input modal_text_input'
                                type="text"
                                name="shelf_name"
                                id="text_input"
                                value={shelfName}
                                onChange={updateShelfName}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="private">Private Shelf?:</label>
                            <input
                                type="checkbox"
                                name="private"
                                id="checkbox"
                                checked={privacy}
                                onChange={updateShelfPrivacy}
                            />
                        </Col>
                        <Col md={6} className='toolbar-right-col'>
                            <input type="submit" className='modal_input'/>
                        </Col>
                    </Row>
                </form>
            </React.Fragment>
        )
    };

export default CreateShelf;