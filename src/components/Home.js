import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, redirect } from "react-router-dom";

const Home = ({user, isLoggedIn}) => {
    const navigate = useNavigate();

    return navigate(`/search`);
};

export default Home;