import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllVideos } from "../../store/videos";
import { NavLink } from "react-router-dom";
import './home.css';

function HomePage() {
    const dispatch = useDispatch();
    const allVideos = useSelector((state) => state.videos.all_videos);

    useEffect(() => {
        dispatch(thunkGetAllVideos());
    }, [dispatch]);

    const allVideosArr = Object.values(allVideos);

    return (
        <div className="spots-content">
            <div className="spots-grid">
                {allVideosArr.map((video) => (
                    <NavLink key={video.id} exact to={`/videos/${video.id}`} className="spot-link">
                        <div key={video.id} className="spot-container">
                            <img className="spot-image" src={`${video.thumbnail}`} alt={`Preview of ${video.title}`}></img>
                            <div className="spot-description">
                                <div className="spot-info">
                                    <div className="spot-title">{video.title}</div>
                                    <div className="spot-price">
                                        <div>
                                            {`${video.User.username}`}
                                        </div>
                                        <div>
                                            {`${video.views} views · ${video.created_at}`}
                                        </div>
                                    </div>
                                </div>
                                <div className="spot-owner">
                                    <img className="spot-owner-avatar" src={`${video.User.avatar}`} alt={`${video.User.username} avatar`}></img>
                                </div>
                                
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default HomePage;