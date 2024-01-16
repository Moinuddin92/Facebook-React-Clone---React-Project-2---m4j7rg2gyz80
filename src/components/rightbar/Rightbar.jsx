import "./rightbar.css";
import React from 'react';
import { Users } from '../../data/userData';
import OnlineFriend from "../onlineFriend/OnlineFriend";

function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <p className="rightbarTitle">Contacts</p>
                <ul className="rightbarFriendList">
                    {Users.filter((user) => {
                        return user.id > 1
                    }).map((u) => (
                        <OnlineFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Rightbar
