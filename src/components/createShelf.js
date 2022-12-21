import React from 'react';
import '../App.css';

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
                <h2>Create New Bookshelf</h2>
                <form id="createshelf" onSubmit={handleCreateShelf}>
                    <div>
                        <label htmlFor="shelf_name">Bookshelf Name:</label>
                        <input
                            type="text"
                            name="shelf_name"
                            id="text_input"
                            value={shelfName}
                            onChange={updateShelfName}
                        />
                        <label htmlFor="private">Private Shelf?:</label>
                        <input
                            type="checkbox"
                            name="private"
                            id="checkbox"
                            checked={privacy}
                            onChange={updateShelfPrivacy}
                        />
                        <input type="submit" />
                    </div>
                </form>
            </React.Fragment>
        )
    };

export default CreateShelf;