import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Person } from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Snackbar from '@mui/material/Snackbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './post.css'
import axios from 'axios';
import { getHeaderWithProjectId } from '../../constant';
import Comments from '../comments/Comments';
import CreateComment from '../createComment/CreateComment';
import { Alert, Menu, MenuItem } from '@mui/material';


export default function Post({ post, userData }) {
    const [like, setLike] = useState(post.likeCount);
    const [isLiked, setIsLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [postMenuOpen, setPostMenuOpen] = useState(false);
    const [cmtOpen, setCmtOpen] = useState(false);
    const [comment, setComment] = useState([]);
    const [commentCount, setCommentCount] = useState(post.commentCount);
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
            // console.log('Post ID:', post._id);
            try {
                const res = await axios.post(
                    `https://academics.newtonschool.co/api/v1/facebook/like/${post._id}`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + userData.token,
                        'projectID': config.headers.projectID
                    }
                }
                );
                // console.log("Res like:", res);

            } catch (err) {
                console.log("Error:", err);
                setOpen(true)
            }
        } else {
            setOpen(true)
            // setIsLiked(false)
        }
    }
    const cmtHandler = async () => {
        if (cmtOpen === false) {
            setCmtOpen(true)
            const config = getHeaderWithProjectId();

            try {
                const res = await axios.get(
                    `https://academics.newtonschool.co/api/v1/facebook/post/${post._id}/comments`, {
                    headers: {
                        'Authorization': 'Bearer ' + userData.token,
                        'projectID': config.headers.projectID
                    }
                }
                );
                // console.log("Res cmt:", res);
                setComment([...res.data.data])

            } catch (err) {
                console.log("Error:", err);
            }
        }
        else {
            setCmtOpen(false)
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
                        <MoreVertIcon style={{ cursor: 'pointer' }} onClick={() => setPostMenuOpen(true)} />
                        <Menu id="demo-positioned-menu" aria-labelledby='demo-positioned-button' open={postMenuOpen} onClose={() => setPostMenuOpen(false)} PaperProps={{ elevation: 0, sx: { position: 'absolute', top: 0 } }} transformOrigin={{ horizontal: '0px', vertical: '0px' }} anchorOrigin={{ horizontal: 'center', vertical: 'center' }} style={{ top: 0 }}>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </Menu>
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
                        <span className="postCommentText" onClick={cmtHandler}>{commentCount} comments</span>
                    </div>
                </div>
                {cmtOpen && comment.length > 0 && (
                    comment.map((c) => (
                        <Comments key={c._id} cmt={c} userData={userData} />
                    )))}
                <CreateComment userData={userData} post={post} comment={commentCount} setComment={setCommentCount} />
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  >
                <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }} variant='filled' >You already liked this post!</Alert>
            </Snackbar>
        </div>
    )
}
