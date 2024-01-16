import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from '@mui/icons-material/Sell';
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Person } from "@mui/icons-material";
import './createPost.css';
import React, { useState, useRef } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { getHeaderWithProjectId } from "../../constant";
import axios from "axios";


export default function CreatePost({ userData, showCreatePost, changeState }) {
    const [postInput, setPostInput] = useState("");
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const [isImgUpload, setIsImgUpload] = useState(false);
    const handleChange = (file) => {
        setFile(file);
    };
    const handleImgUpload = () => {
        setIsImgUpload(!isImgUpload);
    };
    const handleBtnClick = async () => {
        var formData = new FormData();
        formData.append("title", `New post created by ${userData.data.name}`);
        formData.append("content", postInput);
        formData.append("images", file);
        console.log("Form Data:", formData);
        const config = getHeaderWithProjectId();
        try {
            const res = await axios.post(`https://academics.newtonschool.co/api/v1/facebook/post/`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + userData.token,
                    'projectID': config.headers.projectID,
                    'Content-Type': 'multipart/form-data',
                }
            })
            // console.log("Created a Post", res);
            if (res.status === 201) {
                changeState();
            }
        } catch (err) {
            console.log("Err posting new Post", err);
        }
    }
    return (
        <>
            <div className={showCreatePost ? "showCreatePost" : "hideCreatePost"}>
                <div className="createPostWrapper">
                    <div className="createPostTop">
                        <h3 className="createPostTitle">Create post</h3>
                        <div className="createPostCloseIconCont">
                            <CloseIcon
                                style={{ fontSize: "26px", opacity: "0.8", cursor: "pointer" }}
                                onClick={() => changeState()}
                            />
                        </div>
                    </div>
                    <hr className="createPostHr" />
                    <div className="createPostCenter">
                        <div className="createPostProfileCont">
                            {userData.data.profileImage ? <img className='createPostProfileImage' src={userData.data.profileImage} alt="" /> : <Person />}
                            <span className="createPostUsername">
                                <b>{userData.data.name}</b>
                            </span>
                        </div>
                        <div className="createPostInputCont">
                            <input
                                value={postInput}
                                onChange={(e) => setPostInput(e.target.value)}
                                type="text"
                                placeholder={`What's on your mind,${userData.data.name}?`}
                                className="createPostInput"
                            />
                        </div>
                    </div>
                    <div className="createPostImgCont">
                        {isImgUpload ?
                            <>
                                <FileUploader handleChange={handleChange} name='file' types={fileTypes} />
                                <div className="createPostCloseIconCont">
                                    <CloseIcon style={{ fontSize: "26px", opacity: "0.8", cursor: "pointer" }} onClick={() => handleImgUpload()} />
                                </div>
                            </>
                            : null}
                    </div>
                    <div className="createPostOptionsCont">
                        <div className="createPostOption">
                            <span className="createPostOptionTitle"><b>Add <span>to your post</span></b></span>
                            <div className="createPostOptionIcons">
                                <span className="circleCont">
                                    <PermMediaIcon
                                        style={{ fontSize: "26px" }}
                                        htmlColor="green"
                                        className="createPostIcon"
                                        onClick={() => handleImgUpload()}
                                    />
                                </span>
                                <span className="circleCont">
                                    <SellIcon
                                        style={{ fontSize: "25px" }}
                                        htmlColor="blue"
                                        className="createPostIcon"
                                    /></span>
                                <span className="circleCont">
                                    <EmojiEmotionsIcon
                                        style={{ fontSize: "26px" }}
                                        htmlColor="orange"
                                        className="createPostIcon"
                                    /></span>
                                <span className="circleCont">
                                    <LocationOnIcon
                                        style={{ fontSize: "26px" }}
                                        htmlColor="red"
                                        className="createPostIcon"
                                    /></span>
                                <span className="circleCont">
                                    <MoreHorizIcon
                                        style={{ fontSize: "26px", opacity: '0.5' }}
                                        className="createPostIcon"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="createPostButtonCont">
                        <button type="button" className="createPostButton" onClick={handleBtnClick} disabled={!postInput}><b>Post</b></button>
                    </div>
                </div>
            </div>
        </>
    )
}
