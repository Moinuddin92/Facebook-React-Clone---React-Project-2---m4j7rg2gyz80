import { Person } from "@mui/icons-material";
import './createComment.css'
import SendIcon from '@mui/icons-material/Send';
import React, { useRef, useState } from "react";
import axios from "axios";
import { getHeaderWithProjectId } from "../../constant";
export default function CreateComment({ userData, post, comment, setComment }) {
    const [crCmtInputData, setCrCmtInputData] = useState("");
    const cmtClickHandle = async () => {
        const config = getHeaderWithProjectId();
        try {
            const res = await axios.post(`https://academics.newtonschool.co/api/v1/facebook/comment/${post._id}`, { content: crCmtInputData }, {
                headers: {
                    'Authorization': 'Bearer ' + userData.token,
                    'projectID': config.headers.projectID
                }
            })
            console.log("Created a comment", res);
            setCrCmtInputData("");
            setComment(comment + 1);
        } catch (err) {
            console.log("Err posting comment", err);
        }
    }
    return (
        <div className="crCmt">
            {userData.profileImage ? <img className='crCmtProfileImage' src={userData.profileImage} alt="" /> : <Person />}
            <input type="text" className="crCmtInput" placeholder="Write a comment" value={crCmtInputData} onChange={(e) => setCrCmtInputData(e.target.value)} />
            <SendIcon className="crCmtPost" onClick={cmtClickHandle} />
        </div>
    )
}