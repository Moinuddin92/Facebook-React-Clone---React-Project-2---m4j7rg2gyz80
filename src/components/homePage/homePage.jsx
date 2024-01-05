import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";
import Feed from "../feed/Feed";
import StoryReel from "../storyReel/StoryReel";

const HomePage = () => {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData.data);
    // console.log("UserData", userData);
    const ref = useRef(null);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const changeState = () => {
        ref.current?.focus();
        setShowCreatePost(!showCreatePost);
    }
    return (
        <>
            <div><StoryReel /></div>
            <div><Header userData={userData} /></div>
            <div><Feed changeState={changeState} userData={userData} /></div>
        </>
    );
}

export default HomePage;