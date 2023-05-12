import React from "react";
import './Card.css';
import numberFormat from "../../helperFuncs/numberFormat";
const VideoCard = ({ thumb, title, owner, views, date }) => {

    return (
        <div className="video-card">
            <img className="video-img" src={thumb} alt={`${owner}'s avatar`}></img>
            <div className="video-title">
                {title}
                {/* <p className="video-owner">{owner}</p>
                <p className="video-views">{`${views} views · ${date}`}</p> */}
            </div>
            <div className="video-owner">{owner}</div>
            <div className="video-views">
                {
                    views === 0 ?
                        `No views · ${date}`
                        : views === 1 ?
                            `${numberFormat(views)} view · ${date}`
                            :
                            `${numberFormat(views)} views · ${date}`
                }
            </div>
        </div>
    )

};

export default VideoCard;
