import React, { useRef, useState } from "react";
import './homePage.css';
import { useSelector } from "react-redux";
import Header from "../header/Header";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import CreatePost from "../createPost/CreatePost";
import Rightbar from "../rightbar/Rightbar";

const HomePage = () => {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const changeState = () => {
        setShowCreatePost(!showCreatePost);
    }
    return (
        <>
            {showCreatePost ? <CreatePost userData={userData} showCreatePost={showCreatePost} changeState={changeState} /> : null}
            <div className={showCreatePost ? "halfVisualHome" : "fullVisualHome"}>
                <Header userData={userData} changeState={changeState} />
                <div className="homeContainer">
                    <Sidebar />
                    <Feed changeState={changeState} userData={userData} showReel={true} />
                    <Rightbar />
                </div>
            </div>
        </>
    );
}

export default HomePage;