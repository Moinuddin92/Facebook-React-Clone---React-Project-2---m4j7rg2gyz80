import React, { useRef, useState } from "react";
import './homePage.css';
import { useSelector } from "react-redux";
import Header from "../header/Header";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import CreatePost from "../createPost/CreatePost";

const HomePage = () => {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData);
    // console.log("UserData", userData);
    const ref = useRef(null);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const changeState = () => {
        ref.current?.focus();
        setShowCreatePost(!showCreatePost);
    }
    return (
        <>
            <div className={showCreatePost ? "halfVisualHome" : "fullVisualHome"}>
                <Header userData={userData} />
                {showCreatePost ? <CreatePost /> : null}
                <div className="homeContainer">
                    <Sidebar />
                    <Feed changeState={changeState} userData={userData} />
                </div>
            </div>
        </>
    );
}

export default HomePage;