import "./sidebar.css";
import {
    RssFeed,
    Chat,
    Group,
    HelpOutline,
    Event
} from "@mui/icons-material";
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [showHidden, setShowHidden] = useState(false)
    const logoutToggle = (showHidden) => {
        setShowHidden(!showHidden);
    }

    const [logout, setLogout] = useState(false);
    const confirmLogout = () => {
        setLogout(!logout)
    }
    const handleDeadClick = () => {
        alert("This feature is coming soon!")
    }

    const [mode, setMode] = useState('day');
    const getSelectedMode = (e) => {
        setMode(e.target.value);
    }
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <RssFeed className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <Group className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Friends</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <Chat className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Messenger</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <VideoLibraryIcon className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <StorefrontIcon className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Marketplace</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <HelpOutline className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => handleDeadClick()}>
                        <Event className="sidebarIcon" style={{ color: '#054af6' }} />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => logoutToggle(showHidden)}>
                        <ExpandCircleDownRoundedIcon className="sidebarIcon" />
                        <span className="sidebarListItemText" >{!showHidden ? "Show more" : "See less"}</span>
                    </li>
                    <Link style={{ textDecoration: 'none' }} to={logout ? '/login' : ''}>
                        <li><h5 id="logout" className={showHidden ? "logout-show" : "logout-hide"} onClick={() => confirmLogout()}>Logout</h5></li></Link>
                    <li>
                        <select id="select-mode" className={showHidden ? "mode-show" : "mode-hide"} onChange={getSelectedMode} value={mode} style={{ background: mode === 'day' ? 'white' : 'black', color: mode === 'night' ? 'grey' : '' }}>
                            <option className="day-mode" value='day' >Day</option>
                            <option className="night-mode" value='night'>Night</option>
                        </select>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <h4 style={{ color: 'grey' }}>Your shortcuts</h4>

            </div>
        </div>
    );
}
