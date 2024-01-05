import Post from "../post/Post";
import "./feed.css";
import Share from '../share/Share';
import axios from 'axios';
import { useEffect, useState } from "react";
import { getHeaderWithProjectId } from "../../constant";

export default function Feed({ changeState, userData }) {
    const [posts, setPosts] = useState([]);
    const config = getHeaderWithProjectId();
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("https://academics.newtonschool.co/api/v1/facebook/post", config);
            console.log(res);
            setPosts(res.data.data)
        }
        fetchPosts();
    }, []);
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share changeState={changeState} userData={userData} />
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
