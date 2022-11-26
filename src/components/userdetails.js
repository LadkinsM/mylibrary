import React, { useEffect } from 'react';
import { Route, useRouteMatch, Routes, useParams, Link } from 'react-router-dom';
import '../App.css';

const UserDetails = () => {
    // Display details for User
    const[userInfo, setUserInfo] = React.useState({});
    const { user_id } = React.useParams();

    useEffect(() => {
        fetch(`/user/${user_id}/user_details`)
            .then((response) => response.json())
            .then((dbUser) => {setUserInfo(dbUser)});
    }, []);





    return (
        <p>User Details</p>
        // <React.Fragment>
        //     <div>
        //         <p>Currently Reading : 
        //             {userInfo.current_read ? <Link to={`book_details/${current_read.book_id}`}>
        //                 {current_read.title}
        //             </Link>: <p>None</p>}
        //         </p>
        //     </div>
        //     <div class="card">
        //         <h1>{userInfo.email}</h1>
        //         <p>{userInfo.personal_description}</p>
        //     </div>
        //     <div>
        //         <Bookshelves user_id={user_id} />
        //     </div>
        // </React.Fragment>
    )};


export default UserDetails;