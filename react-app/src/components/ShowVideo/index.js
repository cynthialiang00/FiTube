import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import { useEditCommentContext } from "../../context/EditContext";
import './ShowVideo.css';
import { thunkGetAllComments } from "../../store/comments";
import CommentCard from "./CommentCard";
import VideoCard from "./VideoCard";
import CreateComment from "./CreateComment";

const ShowVideo = () => {
    const { videoId } = useParams();
    const dispatch = useDispatch();

    const { isEditComment, editCommentId} = useEditCommentContext();

    const video = useSelector((state) => state.videos.one_video);
    const comments = useSelector((state) => state.comments);
    const sessionUser = useSelector(state => state.session.user);

    let recommended;

    console.log("EDITING? ",isEditComment)
    console.log("EDIT ID ", editCommentId)

    useEffect(() => {
        dispatch(thunkGetOneVideo(videoId));
        dispatch(thunkGetAllComments(videoId));
    }, [dispatch, videoId]);

    if (Object.values(video).length) recommended = Object.values(video.More);
    const commentsArr = Object.values(comments).reverse();
    // console.log("video:", video)
    // console.log("more: ", recommended)
    // console.log("commentsArr: ", commentsArr)

    if(!Object.values(video).length) return(<h1 style={{color: "#f1f1f1"}}>404: Video Not Found</h1>)

    return(
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
                {/* COMMENTS SECTION*/}
                { commentsArr.length ?
                    <div className="video-comment-count">
                        {`${commentsArr.length} Comments`}
                    </div>
                    :
                    <div className="video-comment-count">
                        No Comments
                    </div>
                }
                {sessionUser ?
                    <CreateComment 
                        user={sessionUser}
                        videoId={videoId}
                    />
                    :
                    <div className="unlogged-video-post-comment">Log In to post a comment</div>
                }
                <div className="video-comments">
                    {commentsArr.length ?
                        (commentsArr.length &&
                            commentsArr.map((cmt) => (
                                    <CommentCard key={cmt.id}
                                        user={sessionUser}
                                        img={cmt.User.avatar}
                                        name={cmt.User.username}
                                        date={cmt.created_at}
                                        text={cmt.content}
                                        commentId={cmt.id}
                                    />
                            ))

                        )
                        :
                        null
                    }
                </div>
                
            </div>
            
            <div className="video-more">
                <div className="video-more-banner">
                    <img src="https://liang-capstone-bucket.s3.amazonaws.com/avatars/rooftopgirlblue_50.jpeg" alt="banner"></img>
                </div>
                {Object.values(video).length &&
                  recommended.map((rec) => (
                    <NavLink key={rec.id} exact to={`/videos/${rec.id}`}>
                        <VideoCard key={rec.id}
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
            <div className="video-page-right"></div>
        </div>
    )
};

export default ShowVideo;
