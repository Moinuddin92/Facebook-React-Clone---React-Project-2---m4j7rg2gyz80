import React from 'react'
import './share.css';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Person } from '@mui/icons-material';

export default function Share({ changeState, userData }) {

    return (
        <div className='share' >

            <div className="shareWrapper">
                <div className="shareTop">
                    {userData.profileImage ? <img className='shareProfileImage' src={userData.profileImage} alt="" /> : <Person />}
                    <div className="shareInputCont"></div>
                    <input placeholder={`What's on your mind,${userData.data.name}?`} onClick={() => changeState()} className='shareInput' />
                </div>
                <hr className='shareHr' />
                <div className="shareButtom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <VideocamIcon htmlColor='red' className='shareIcon' />
                            <span className="shareOptionLongText">
                                Live video
                            </span>
                            <span className="shareOptionText">
                                Live
                            </span>
                        </div>
                        <div className="shareOption">
                            <PhotoLibraryIcon htmlColor='green' className='shareIcon' />
                            <span className="shareOptionLongText">
                                Photo/video
                            </span>
                            <span className="shareOptionText">
                                Gallery
                            </span>
                        </div>
                        <div className="shareOption">
                            <InsertEmoticonIcon htmlColor='orange' className='shareIcon' />
                            <span className="shareOptionLongText">
                                Feeling/Activity
                            </span>
                            <span className="shareOptionText">
                                Feel
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
