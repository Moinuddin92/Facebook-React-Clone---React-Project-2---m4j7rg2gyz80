import "./header.css";
import { Search, Person } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { RiGroup2Fill } from "react-icons/ri";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import fbIcon from '../../asset/img/f_logo_RGB-Blue_1024.png';
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { logout } from "../../store/slice/userSlice";

export default function Header({ userData }) {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/">
                        <img src={fbIcon} height={45} style={{ marginLeft: 10 }} />
                    </Link>
                </div>
                <div className="topbarLeft2">
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input
                            placeholder="Search Facebook clone"
                            className="searchInput"
                        />
                    </div>
                </div>
                <div className="topbarCenter">
                    <div className="topbarLinks">
                        <div className="topbarCenterIcon">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <div className="topbarHomeIcon">
                                    <HomeIcon style={{ fontSize: '30px', position: 'relative', opacity: '0.7' }} />
                                </div>
                            </NavLink>
                        </div>
                        <div className="topbarCenterIcon">
                            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <FlagIcon style={{ fontSize: '30px' }} />
                            </NavLink>
                        </div>
                        <div className="topbarCenterIcon">
                            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <SubscriptionsIcon style={{ fontSize: '30px' }} />
                            </NavLink>
                        </div>
                        <div className="topbarCenterIcon">
                            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <StorefrontIcon style={{ fontSize: '30px' }} />
                            </NavLink>
                        </div>
                        <div className="topbarCenterIcon">
                            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <RiGroup2Fill style={{ fontSize: '30px' }} />
                            </NavLink>
                        </div>

                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <div>
                                <Person style={{ color: "grey", borderRadius: '50%', fontSize: '31px' }} />
                            </div>
                        </div>
                        <div className="topbarIconItem">
                            <div>
                                <QuestionAnswerIcon style={{ color: "grey", fontSize: '31px' }} />
                            </div>
                            {/* <span className="topbarIconBadge">2</span> */}
                        </div>
                        <div className="topbarIconItem">
                            <div>
                                <NotificationsActiveIcon style={{ color: "grey", borderRadius: '50%', fontSize: '31px' }} />
                            </div>
                            {/* <span className="topbarIconBadge">1</span> */}
                        </div>
                    </div>

                    {
                        userData.data.profileImage ? <img src={userData.data.profileImage ? userData.data.profileImage : null} alt="Profile" className="topbarImg" /> :
                            <div onClick={() => { setOpen(true) }}>
                                <Person className="topbarIconCont" style={{ color: "black", borderRadius: '50%', fontSize: '31px', padding: 5 }} />
                            </div>
                    }

                    {userData ? <span style={{ fontWeight: 700, color: 'black' }}>{userData.data.name}</span> : null}
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        open={open}
                        onClose={() => setOpen(false)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={() => {
                            setOpen(false)
                            navigate(`/profile/${userData.data.name}`)
                        }}>Profile</MenuItem>
                        <MenuItem onClick={() => {
                            dispatch(logout());
                            setOpen(false);
                            navigate("/");
                        }}>Logout</MenuItem>
                    </Menu>
                </div >
            </div >
        </>
    );
}
