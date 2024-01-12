import React, { useRef, useState } from "react";
import './homePage.css';
import { useSelector } from "react-redux";
import Header from "../header/Header";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import CreatePost from "../createPost/CreatePost";

const HomePage = () => {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const changeState = () => {
        setShowCreatePost(!showCreatePost);
    }
    return (
        <>
            {showCreatePost ? <CreatePost userData={userData.data} showCreatePost={showCreatePost} changeState={changeState} /> : null}
            <div className={showCreatePost ? "halfVisualHome" : "fullVisualHome"}>
                <Header userData={userData} />
                <div className="homeContainer">
                    <Sidebar />
                    <Feed changeState={changeState} userData={userData} />
                </div>
            </div>
        </>
    );
}

export default HomePage;