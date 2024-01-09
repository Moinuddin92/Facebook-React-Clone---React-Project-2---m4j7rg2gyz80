import Post from "../post/Post";
import "./feed.css";
import Share from '../share/Share';
import axios from 'axios';
import { useEffect, useState } from "react";
import { getHeaderWithProjectId } from "../../constant";
import StoryReel from "../storyReel/StoryReel";

export default function Feed({ changeState, userData }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const config = getHeaderWithProjectId();
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`https://academics.newtonschool.co/api/v1/facebook/post?limit=10&page=${page}`, config);
            console.log("Data Recd:", res);
            console.log("Post Data:", posts);
            setPosts([...posts, ...res.data.data])
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
                <button onClick={() => setPage(page + 1)}>Load more...</button>
            </div>
        </div>
    );
}
