import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Search, Person } from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Snackbar from '@mui/material/Snackbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './post.css'
import axios from 'axios';
import { getHeaderWithProjectId } from '../../constant';


export default function Post({ post, userData }) {
    const [like, setLike] = useState(post.likeCount);
    const [isLiked, setIsLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const likeHandler = async () => {
        if (isLiked === false) {
            setIsLiked(true)
            const config = getHeaderWithProjectId();
            console.log('Post ID:', post._id);
            try {
                const res = await axios.post(
                    `https://academics.newtonschool.co/api/v1/facebook/like/${post._id}`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + userData.token,
                        'projectID': config.headers.projectID
                    }
                }
                );
                console.log("Res like:", res);

            } catch (err) {
                console.log("Error:", err);
                setOpen(true)
            }
        } else {
            setOpen(true)
            // setIsLiked(false)
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
                                <ThumbUpIcon className={isLiked ? 'likedIcon' : 'likeIcon'} onClick={likeHandler} />
                            </div>
                            <div className="likeIconCont">
                                <FavoriteIcon className={isLiked ? 'likeHIcon' : 'likeIcon'} onClick={likeHandler} />
                            </div>
                        </div>
                        <span className="postLikeCounter">{isLiked ? "You and " : null}{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.commentCount} comments</span>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="You already liked this post!" />
        </div>
    )
}
