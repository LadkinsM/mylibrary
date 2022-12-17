import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, Link, useParams } from 'react-router-dom';
import '../App.css';
import { UserBookshelfComp } from './usercomps';
import { UserReviewComp } from './reviewcomp';

const UserDetails = ({user, loading, isLoggedIn}) => {
    // Display details for User
    const [shelves, setShelves] = React.useState([]);
    const[currentRead, setCurrentRead] = React.useState({})

    useEffect(() => {
        if (user.user_id) {
            fetch(`/user/${user.user_id}/bookshelves`)
                .then((response) => response.json())
                .then((dbshelves) => {setShelves(dbshelves)});
        }
    }, [user]);

    useEffect(() => {
        if (user.user_id) {
                console.log("fetch")
                fetch(`/user/${user.user_id}/currentread`)
                    .then((response) => response.json())
                    .then((bookData) => {setCurrentRead(bookData)});
                }
    }, [user]);


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
                <UserBookshelfComp shelves={shelves} user={user} isLoggedIn={isLoggedIn}/>
            </div>
            <div>
                <UserReviewComp user={user} isLoggedIn={isLoggedIn}/>
            </div>
        </React.Fragment>
    )};


export default UserDetails;