import Post from "../post/Post";
import "./feed.css";
import Share from '../share/Share';
import axios from 'axios';
import { useEffect, useState } from "react";
import { getHeaderWithProjectId } from "../../constant";
import StoryReel from "../storyReel/StoryReel";
import Button from '@mui/material/Button';

export default function Feed({ changeState, userData }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const config = getHeaderWithProjectId();
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`https://academics.newtonschool.co/api/v1/facebook/post?limit=10&page=${page}`, config);
                console.log("Posts", res);
                setPosts([...posts, ...res.data.data])
            }
            catch (err) {
                console.log("error fetching post", err);
                alert(err.response.data.message)
            }

        }
        fetchPosts();
    }, [page]);
    return (
        <div className="feed">
            <div className="feedWrapper">
                <StoryReel />
                <Share changeState={changeState} userData={userData} />
                {posts.map((p) => (
                    <Post key={p._id} post={p} userData={userData} />
                ))}
                <Button variant="contained" onClick={() => setPage(page + 1)}>Load more...</Button>
            </div>
        </div>
    );
}
