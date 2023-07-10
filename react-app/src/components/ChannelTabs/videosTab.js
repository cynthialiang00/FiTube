import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import numberFormat from "../../helperFuncs/numberFormat";
import './videoTabs.css'


function VideosTab({userVideos}) {
    const moment = require('moment');

    const userVideosArr = Object.values(userVideos);

    if (!userVideosArr.length) {
        return (
            <div className="no-content-channel-tab">
                This user has no videos.
            </div>
        )

    }

    return (
        <>
            <div className="videos-grid">
                {userVideosArr.map((video) => (
                    <NavLink key={video.id} exact to={`/videos/${video.id}`} className="video-container">
                            <img className="video-image" src={`${video.thumbnail}`} alt={`Preview of ${video.title}`}></img>
                            <div className="video-description">
                                    <div className="video-title">
                                        {video.title.length > 65 ?
                                            `${video.title.substring(0, 65)}...`
                                            :
                                            video.title
                                        }
                                    </div>
                                    <div className="video-details">
                                        <div>
                                            {
                                                video.views === 0 ?
                                                    `No views · ${moment(video.created_at).fromNow()}`
                                                    : video.views === 1 ?
                                                        `${numberFormat(video.views)} view · ${moment(video.created_at).fromNow()}`
                                                        :
                                                        `${numberFormat(video.views)} views · ${moment(video.created_at).fromNow()}`
                                            }
                                        </div>
                                    </div>

                            </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default VideosTab;
