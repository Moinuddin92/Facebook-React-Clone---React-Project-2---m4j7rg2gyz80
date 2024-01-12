import React, { useEffect, useState } from "react";
import axios from "axios";
import './comments.css'
import { Person } from "@mui/icons-material";
import { getHeaderWithProjectId } from "../../constant";
export default function Comments({ cmt, userData }) {
    const [user, setUser] = useState({});
    const userFind = async () => {
        const config = getHeaderWithProjectId();
        try {
            const res = await axios.get(`https://academics.newtonschool.co/api/v1/facebook/user/${cmt.author}`, {
                headers: {
                    'Authorization': 'Bearer ' + userData.token,
                    'projectID': config.headers.projectID
                }
            })
            console.log("Res user", res);
            setUser(res.data.data);
        }
        catch (err) {
            console.log("Error fetching User", err);
        }
    }
    useEffect(() => {
        userFind();
    }, [])
    return (
        <div className="comment">
            <div className="commentWrapper">
                <div className="cmtTop">
                    <div className="cmtTopLeft">
                        {user?.profileImage ? <img className='cmtProfileImage' src={user.profileImage} alt="" /> : <Person />}
                    </div>
                    <div className="cmtContentWrapper">
                        <span className="cmtUsername">{user?.name ? user.name : cmt.author}</span>
                        <div>
                            <span className="cmtContent">{cmt.content}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}