import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, Link, useParams } from 'react-router-dom';
import '../App.css';
import { UserBookshelfComp } from './usercomps';

const UserDetails = () => {
    // Display details for User
    const[userInfo, setUserInfo] = React.useState({});
    const [shelves, setShelves] = React.useState([]);
    const { user_id } = useParams();

    useEffect(() => {
        fetch(`/user/${user_id}/user_details`)
            .then((response) => response.json())
            .then((dbUser) => {setUserInfo(dbUser)});
    }, []);

    useEffect(() => {
        fetch(`/user/${user_id}/bookshelves`)
            .then((response) => response.json())
            .then((dbshelves) => {setShelves(dbshelves)});
    }, []);

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
                <h1>{userInfo.email}</h1>
                <p>{userInfo.personal_description}</p>
            </div>
            <div>
                <UserBookshelfComp shelves={shelves} user_id={user_id} />
            </div>
            {/* <div>
                <Bookshelves user_id={user_id} />
            </div> */}
        </React.Fragment>
    )};


export default UserDetails;