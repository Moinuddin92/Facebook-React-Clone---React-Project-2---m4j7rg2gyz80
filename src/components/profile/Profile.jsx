import React from "react";
import "./profile.css";
import Feed from "../../components/feed/Feed";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Header from '../header/Header';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Link } from "react-router-dom";
import { Users } from '../../data/userData';
import { useSelector } from "react-redux";
import coverpic from '../../asset/img/coverpic.jpg';
import noProfilePic from '../../asset/img/noProfilePic.png';


function Profile() {
    const userData = useSelector(state => state.user.user.userData.data.user ? state.user.user.userData.data.user : state.user.user.userData);
    return (
        <div className="profile">
            <Header userData={userData} />
            <div className="fbIcon">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img height='60px' src={"../assets/icon.png"} alt="" />
                </Link>
            </div>
            <div className="profileContainer">
                <div className="profileCenter">
                    <div className="profileCenterTop">
                        <img
                            src={coverpic}
                            alt="coverphoto"
                            className="coverPhoto"
                        />
                        <button className="editCoverPhotoBtn">
                            <CameraAltIcon />
                            <b>Edit <span className="editPicText">Cover Photo</span></b>
                        </button>
                    </div>
                    <div className="profileCenterDown">
                        <div className="profileCenterDownCont">
                            <div className="profilePhotoCont">
                                <img
                                    src={userData.data.profileImage ? userData.data.profileImage : noProfilePic}
                                    alt="profiephoto"
                                    className="profilePhoto"
                                />
                            </div>
                            <h4 className="profileUsername">
                                {userData.data.name}{" "}
                                <p style={{ fontSize: "16px", margin: "0", opacity: "0.5" }}>
                                    209 friends
                                </p>
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="profileBottom">
                    <div className="profileBottomLeft">
                        <div className="profileUserInfo">
                            <h4 style={{ position: 'absolute', top: '50px', marginLeft: '5px', marginBottom: '5px' }}>Intro</h4>
                            <div style={{ margin: '20px', fontFamily: 'inherit', display: 'flex', flex: '2' }}>
                                {userData.data.education.schoolName ? `Studied at ${userData.data.education[0].schoolName}` : null}
                                {userData.data.address.city ? `Lives in ${userData.data.address.city}` : null}
                                {userData.data.workExprience.length > 0 ? <><BusinessCenterIcon /> {`Works in ${userData.data.workExprience[0].companyName}`}</> : null}
                                {userData.data.createdAt ? <><AssignmentIndIcon style={{ color: 'gray' }} />{`Joined since ${new Date(userData.data.createdAt).getFullYear()}`}</> : null}
                            </div>

                            <button type="button" className="editBioButton"><b>Edit Bio</b></button>
                        </div>
                        <div className="profileMutualFriendCont">
                            <h4
                                style={{
                                    position: "absolute",
                                    top: "-20px",
                                    left: "5px",
                                    margin: "0",
                                }}
                            >
                                Mutual Friends
                            </h4>
                            {Users.filter(function (user) {
                                return user.id > 1 && user.id <= 7;
                            }).map(function (user) {
                                return (
                                    <div key={user.id} className="mutualFriend">
                                        <img
                                            className="profileMutualFriendImg"
                                            src={user.profilePicture}
                                            alt=""
                                        />
                                        <span className="profileMutualFriendName">
                                            {user.username}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="profileBottomRight">
                        <Feed className="profileFeed" userData={userData} showReel={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
