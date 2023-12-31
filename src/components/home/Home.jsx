import React from "react";
import { useSelector } from "react-redux";
import Login from "../login/Login";
import HomePage from "../homePage/homePage";


const Home = () => {
    const auth = useSelector(state => state.user.user.auth);
    return (
        auth ? <HomePage /> : <Login />
    );
}

export default Home;