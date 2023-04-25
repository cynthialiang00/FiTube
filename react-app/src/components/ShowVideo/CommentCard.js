import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import './ShowVideo.css';

const CommentCard = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch();
    let recommended;
    const video = useSelector((state) => state.videos.one_video);

    useEffect(() => {
        dispatch(thunkGetOneVideo(videoId));
    }, [dispatch, videoId]);

    console.log(video)
    if (Object.values(video).length) recommended = Object.values(video.More);
    console.log(recommended)
    if (!video) return (<h1>404: Video not found</h1>);
    return (

    )

};

export default CommentCard;
