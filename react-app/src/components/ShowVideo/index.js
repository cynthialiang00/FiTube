import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import './ShowVideo.css';
import { thunkGetAllComments } from "../../store/comments";

const ShowVideo = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch();
    let recommended;
    const video = useSelector((state) => state.videos.one_video);
    const comments = useSelector((state) => state.comments);

    useEffect(() => {
        dispatch(thunkGetOneVideo(videoId));
        dispatch(thunkGetAllComments(videoId));
    }, [dispatch, videoId]);


    if (Object.values(video).length) recommended = Object.values(video.More);

    
    console.log(video)
    console.log(recommended)
    console.log(comments)
    if (!video) return (<h1>404: Video not found</h1>);
    return (
        
        <div className="video-page">
            <div className="video-page-left"></div>
            <div className="video-content">
                <ReactPlayer 
                    width="674px"
                    height="379px"
                    controls={true}
                    url={video.url}
                />
                <div id="video-title">{video.title}</div>
                <div className="video-utils">
                    <div className="video-owner-box">
                        <img id="video-owner-img" src={Object.values(video).length && video.User.avatar} alt="owner user avatar"></img>
                        <div id="video-owner-name">{Object.values(video).length  && video.User.username}</div>
                    </div>
                    <div className="video-likes-box"></div>
                    <div className="video-description-box">
                        <div id="video-views"></div>
                        <div id="video-date"></div>
                        <div id="video-description">{video.description}</div>
                    </div>
                    <div className="video-comments"></div>
                </div>
            </div>
            <div className="video-more">
                Recommendations here
            </div>
            <div className="video-page-right"></div>
        </div>
    )

};

export default ShowVideo;
