import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = ({user, isLoggedIn}) => {
    //Not in use. Homepage, navigates to search. 
    const navigate = useNavigate();

    return navigate(`/search`);
};

export default Home;