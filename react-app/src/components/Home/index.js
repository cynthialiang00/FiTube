import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllVideos } from "../../store/videos";
import { NavLink, useHistory } from "react-router-dom";
import './home.css';

import loadSpin from '../../assets/Pulse-1.3s-200px (1).svg'

import numberFormat from "../../helperFuncs/numberFormat";
import notFoundImg from '../Forbidden/404.svg';

function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allVideos = useSelector((state) => state.videos.all_videos);
    const moment = require('moment');
    const [isContentLoading, setIsContentLoading] = useState(true);
    useEffect(() => {
        
        dispatch(thunkGetAllVideos()).then((res) => (setIsContentLoading(false)));

    }, [dispatch]);

    const allVideosArr = Object.values(allVideos);

    const handleClickAvatar = (e, userId) => {
        e.preventDefault();
        return history.push(`/channels/${userId}`)
    };

    if (isContentLoading) {
        return (
            <div className="loading-spinner">
                <img src={loadSpin}
                     alt="loading"
                >
                </img>
            </div>
        )
    }

    if (!Object.values(allVideos).length) return (
        <>
            <div className="video-not-found">
                <img className="video-not-found-photo"
                    src={notFoundImg}
                    alt="not allowed"
                >
                </img>
                <div> 404: Resource not found. Click <NavLink to="/">here</NavLink> to go to the home page.</div>

            </div>
        </>
    );

    return (
        <div className="spots-content">
            <div className="spots-grid">
                {allVideosArr.map((video) => (
                    <NavLink key={video.id} exact to={`/videos/${video.id}`} className="spot-link">
                        <div key={video.id} className="spot-container">
                            <img className="spot-image" src={`${video.thumbnail}`} alt={`Preview of ${video.title}`}></img>
                            <div className="spot-description">
                                <div className="spot-info">
                                    <div className="spot-title">
                                        {video.title.length > 65 ?
                                            `${video.title.substring(0,65)}...`
                                        :
                                            video.title
                                        }
                                    </div>
                                    <div className="spot-price">
                                        <div>
                                            {`${video.User.username}`}
                                        </div>
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
                                <button className="spot-owner" 
                                        onClick={(e) => handleClickAvatar(e, video.user_id)}
                                >
                                    <img className="spot-owner-avatar" src={`${video.User.avatar}`} alt={`${video.User.username} avatar`}></img>
                                </button>
                                
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
