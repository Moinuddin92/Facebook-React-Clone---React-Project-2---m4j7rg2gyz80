import React from 'react';
import "./story.css";


function Story({ image, profileSrc, title }) {
    return (
        <div style={{ backgroundImage: `url(${image})` }} className="story">
            <img className="story_avatar" src={profileSrc} height={40} width={40} />
            <h4>{title}</h4>
        </div>
    )
}

export default Story
