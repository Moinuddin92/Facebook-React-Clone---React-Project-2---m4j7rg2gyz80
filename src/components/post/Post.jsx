// import React,{useEffect, useState} from 'react'
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Search, Person } from "@mui/icons-material";
import './post.css'
import axios from 'axios';


export default function Post({ post }) {
    const [like, setLike] = useState(post.likeCount);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        if (isLiked === false) {
            setLike(like + 1)
            setIsLiked(true)
        } else {
            setLike(like - 1)
            setIsLiked(false)
        }
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {post.author.profileImage ? <img className='postProfileImage' src={post.author.profileImage} alt="" /> : <Person />}
                        <span className="postUsername">{post.author.name}</span>
                        {/* <span className="postDate">{post.date}</span> */}
                    </div>

                    <div className="postTopRight">
                        <MoreVertIcon style={{ cursor: 'pointer' }} />
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postText">{post.content}</span>
                    {post.images[0] ? <img className='postImage' src={post.images[0]} alt="" /> : null}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <div style={{ display: 'flex' }}>
                            <div className="likeIconCont">
                                <img className='likeIcon' onClick={likeHandler} src={"../assets/like.png"} alt="" />
                            </div>
                            <div className="likeIconCont">
                                <img className='likeIcon' onClick={likeHandler} src={"../assets/heart.png"} alt="" />
                            </div>
                        </div>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.commentCount} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
