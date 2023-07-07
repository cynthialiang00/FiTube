import React from "react";
import './PlaylistSidebar.css'
import { NavLink } from "react-router-dom";

const PlaylistVideoCard = ({video, index, currVideoId}) => {

    return (
        <NavLink 
                exact to={`/videos/${video.id}`} 
                className={+currVideoId === video.id ? 
                            "video-show-playlist-video-card-current"
                            : 
                            "video-show-playlist-video-card"
                        }

        >
            <div id="video-show-playlist-video-card-index">
                {index+1}
            </div>
            <img id="video-show-playlist-video-card-thumbnail"
                src={video.thumbnail} 
                alt="video preview">

            </img>

            <div className="video-show-playlist-video-card-details">
                <div id="video-show-playlist-video-card-title">
                    {video.title.length > 60 ?
                        `${video.title.substring(0, 60)}...`
                    :
                        video.title
                    }
                </div>
                <div id="video-show-playlist-video-card-user">
                    {video.User.username}
                </div>
            </div>

        </NavLink>

    )

};

export default PlaylistVideoCard;
