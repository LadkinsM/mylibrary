import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, Link, useParams } from 'react-router-dom';
import '../App.css';
import { UserBookshelfComp } from './usercomps';
import { UserReviewComp } from './reviewcomp';

const UserDetails = ({user, loading}) => {
    // Display details for User
    const [shelves, setShelves] = React.useState([]);
    const[currentRead, setCurrentRead] = React.useState({})

    console.log(user.user_id)

    useEffect(() => {
        fetch(`/user/${user.user_id}/bookshelves`)
            .then((response) => response.json())
            .then((dbshelves) => {setShelves(dbshelves)});
    }, []);

    useEffect(() => {
        fetch(`/user/${user.user_id}/currentread`)
            .then((response) => response.json())
            .then((bookData) => {setCurrentRead(bookData)});
    }, []);


    return (
        <React.Fragment>
            <div>
                <p>Currently Reading :  
                    {currentRead.book_id !== 'None' ? <Link to={`book_details/${currentRead.book_id}`}>
                        {currentRead.title} by {currentRead.author}
                    </Link>
                    : <Link to='/search'>What are you currently reading?</Link>}
                </p>
            </div>
            <div className="card">
                <h1>{user.email}</h1>
                <p>{user.personal_description}</p>
            </div>
            <div>
                <UserBookshelfComp shelves={shelves} user={user} />
            </div>
            <div>
                <UserReviewComp user={user} />
            </div>
        </React.Fragment>
    )};


export default UserDetails;