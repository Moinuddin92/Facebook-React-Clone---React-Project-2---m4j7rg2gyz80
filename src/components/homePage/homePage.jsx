import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData.data);
    // console.log("UserData", userData);
    return (
        <div>{userData.name}</div>
    );
}

export default HomePage;