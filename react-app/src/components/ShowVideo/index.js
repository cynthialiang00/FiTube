import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import './ShowVideo.css';
import { thunkGetAllComments } from "../../store/comments";
import CommentCard from "./CommentCard";
import VideoCard from "./VideoCard";

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

    const commentsArr = Object.values(comments)
    console.log("video:", video)
    console.log("more: ", recommended)
    console.log("commentsArr: ", commentsArr)

    if (!video) return (<h1>404: Video not found</h1>);
    return (
        
        <div className="video-page">
            <div className="video-page-left"></div>
            <div className="video-content">
                <div className="video-player">
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        controls={true}
                        url={video.url}
                    />
                </div>
                
                <div id="video-title">{Object.values(video).length && video.title}</div>
                <div className="video-utils">
                    <div className="video-owner-box">
                        <img id="video-owner-img" src={Object.values(video).length && video.User.avatar} alt="owner user avatar"></img>
                        <div id="video-owner-name">{Object.values(video).length  && video.User.username}</div>
                    </div>
                    <div className="video-likes-box"></div>
                </div>
                <div className="video-description-box">
                    <span id="video-views">{Object.values(video).length && video.views} views</span>
                    <span id="video-date">{Object.values(video).length && video.created_at}</span>
                    <div id="video-description">{Object.values(video).length && video.description}</div>
                </div>
                
            </div>
            <div className="video-comments">
                {/* <CommentCard
                    img={commentsArr.length && commentsArr[0].User.avatar}
                    name={commentsArr.length && commentsArr[0].User.username}
                    date={commentsArr.length && commentsArr[0].created_at}
                    text={commentsArr.length && commentsArr[0].content}
                /> */}
            </div>
            <div className="video-more">
                {Object.values(video).length &&
                  recommended.map((rec) => (
                    <NavLink key={rec.id} exact to={`/videos/${rec.id}`}>
                        <VideoCard 
                            thumb={rec.thumbnail}
                            title={rec.title.length > 50 ? `${rec.title.slice(0,50)}...`: rec.title}
                            owner={rec.User.username}
                            views={rec.views}
                            date={rec.created_at.slice(0,16)}
                        />
                    </NavLink>
                  ))
                }
            </div>
            {/* <div className="video-page-right"></div> */}
        </div>
    )

};

export default ShowVideo;
