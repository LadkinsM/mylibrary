import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, Link, useParams } from 'react-router-dom';
import '../App.css';
import { UserBookshelfComp } from './usercomps';

const UserDetails = ({user}) => {
    // Display details for User
    // const[userInfo, setUserInfo] = React.useState({});
    const [shelves, setShelves] = React.useState([]);

    console.log(user.user_id)

    // useEffect(() => {
    //     fetch(`/user/${user.user_id}/user_details`)
    //         .then((response) => response.json())
    //         .then((dbUser) => {setUserInfo(dbUser)});
    // }, []);

    useEffect(() => {
        fetch(`/user/${user.user_id}/bookshelves`)
            .then((response) => response.json())
            .then((dbshelves) => {setShelves(dbshelves)});
    }, []);

    console.log(shelves);

    return (
        <React.Fragment>
            {/* <div>
                <p>Currently Reading : 
                    {userInfo.current_read ? <Link to={`book_details/${current_read.book_id}`}>
                        {current_read.title}
                    </Link>: <p>None</p>}
                </p>
            </div> */}
            <div className="card">
                <h1>{user.email}</h1>
                <p>{user.personal_description}</p>
            </div>
            <div>
                <UserBookshelfComp shelves={shelves} user={user} />
            </div>
        </React.Fragment>
    )};


export default UserDetails;