import { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkGetOneVideo } from "../../store/videos";
import { useSelector } from "react-redux";
import ReactPlayer from 'react-player'
import './ShowVideo.css';
import { thunkGetAllComments } from "../../store/comments";
import { thunkSubscribeVideoUser } from "../../store/videos";
import OpenModalButton from "../OpenModalButton";
import UnsubscribeModal from "./SubscribeModals/UnsubscribeModal";
import CommentCard from "./CommentCard";
import VideoCard from "./VideoCard";
import CreateComment from "./CreateComment";
import PlaylistSidebar from "./PlaylistSidebar/PlaylistSidebar";
import numberFormat from "../../helperFuncs/numberFormat";
import notFoundImg from '../Forbidden/404.svg';
import { thunkGetPlaylistVideos } from "../../store/playlist";
import { useShowPlaylistContext } from "../../context/ShowPlaylist";
import findNextKey from "../../helperFuncs/findNextKey";

const ShowVideo = () => {
    const history = useHistory();
    const { videoId } = useParams();
    const dispatch = useDispatch();
    const moment = require('moment');

    const [showMore, setShowMore] = useState(false);
    const { currPlaylistId } = useShowPlaylistContext();

    const video = useSelector((state) => state.videos.one_video);
    const playlistVideos = useSelector((state) => state.playlist.playlist_videos);
    const playlist = useSelector((state) => state.playlist);
    const comments = useSelector((state) => state.comments);
    const sessionUser = useSelector(state => state.session.user);

    

    if (currPlaylistId) {
        console.log('PLAYLIST CONTEXT ID: ', currPlaylistId);
    }

    let recommended;
    
    useEffect(() => {
        dispatch(thunkGetOneVideo(videoId));
        dispatch(thunkGetAllComments(videoId));

        if (currPlaylistId) {
            dispatch(thunkGetPlaylistVideos(currPlaylistId));
        }
    }, [dispatch, videoId, currPlaylistId]);

    const clickSub = async (e, userId) => {
        e.preventDefault();
        if (!sessionUser) {
            return history.push({
                pathname: "/login",
                state: {goBackURL: history.location.pathname}
            });
        }
        await dispatch(thunkSubscribeVideoUser(userId));
        return;
    }

    const clickLogIn = async (e) => {
        e.preventDefault();
        return history.push({
            pathname: "/login",
            state: { goBackURL: history.location.pathname }
        });
    }

    

    if (Object.values(video).length) recommended = Object.values(video.More);
    const commentsArr = Object.values(comments).reverse();

    const playlistVideosArr = Object.values(playlistVideos);

   

    const handlePlaylistNext = () => {
        
        const nextVideoId = findNextKey(playlistVideos, videoId);
        return history.push(`/videos/${nextVideoId}`);
        
    }

    if(!Object.values(video).length) return(
        <>
            <div className="video-not-found">
                <img className="video-not-found-photo"
                    src={notFoundImg}
                    alt="not allowed"
                >
                </img>
                <div> 404: Resource not found. Click <NavLink to="/videos">here</NavLink> to go to the home page.</div>

            </div>
        </>
    );

    return(
        <div className="video-page">
            <div className="video-page-left"></div>
            <div className="video-content">
                {
                    currPlaylistId ? 
                        <div className="video-player">
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                controls={true}
                                playing={true}
                                url={video.url}
                                onEnded={handlePlaylistNext}
                            />
                        </div>
                    :
                        <div className="video-player">
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                controls={true}
                                playing={true}
                                url={video.url}
                            />
                        </div>
                }
                
                
                <div id="video-title">{video.title}</div>
                <div className="video-utils">
                    <NavLink className="video-owner-wrapper" to={`/channels/${video.user_id}`}>
                        <img id="video-owner-img" src={video.User.avatar} alt="owner user avatar"></img>
                        <div className="video-owner-details">
                            <div id="video-owner-name">{video.User.username}</div>
                            <div id="video-owner-subs">
                                {video.User.num_subscribers === 0 ?
                                    `No subscribers`
                                    : video.User.num_subscribers === 1 ?
                                        `${video.User.num_subscribers} subscriber`
                                    :
                                        `${video.User.num_subscribers} subscribers`
            
                                }
                            </div>
                        </div>
                        
                    </NavLink>
                    
                    {   sessionUser && video.user_id === sessionUser.id ?
                            null
                        :
                        video.User.is_subscribed_to ?
                            <OpenModalButton
                                buttonText={<><i className="fa-regular fa-bell" style={{ color: "#ffffff" }}></i>Subscribed</>}
                                className={"vid-unsubscribe-btn"}
                                modalComponent={<UnsubscribeModal userId={video.user_id} username={video.User.username}/>}
                            />
                            :
                            <button id="vid-subscribe-btn"
                                onClick={(e) => clickSub(e, video.user_id)} 
                            >
                                    Subscribe
                            </button>
                    }


                </div>

                {video.description.length > 290 ?
                    (<div className="video-description-box">
                        <div id="video-description-stats">
                            <p id="video-views">
                                {
                                    video.views === 0 ?
                                        `No views`
                                        : video.views === 1 ?
                                            `${numberFormat(video.views)} view`
                                            :
                                            `${numberFormat(video.views)} views`
                                }
                            </p>
                            <p id="video-date">{`${moment(video.created_at).fromNow()}`}</p>
                        </div>
                        {showMore ?
                            <div id="video-description">{video.description}</div>
                            :
                            <div id="video-description">{video.description.substring(0, 290)}</div>
                        }
                        <button id="show-hide-btn" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>

                    </div>)
                :
                    (<div className="video-description-box">
                        <div id="video-description-stats">
                            <p id="video-views">
                                {
                                    video.views === 0 ?
                                    `No views`
                                    : video.views === 1 ?
                                        `${numberFormat(video.views)} view`
                                    :
                                        `${numberFormat(video.views)} views`
                                }
                            </p>
                            <p id="video-date">{`${moment(video.created_at).fromNow()}`}</p>
                        </div>
                        <div id="video-description">{video.description}</div>
                    </div>)
                }
                
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
                    <div className="unlogged-video-post-comment">
                        <button onClick={clickLogIn}>Log In</button>
                        to post a comment
                    </div>
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
                {
                    currPlaylistId && playlistVideosArr.length > 0 ?
                        <PlaylistSidebar playlist={playlist} currVideoId={videoId}/>
                    :
                        <div className="video-more-banner">
                            <img src="https://liang-capstone-bucket.s3.amazonaws.com/avatars/rooftopgirlblue_50.jpeg" alt="banner"></img>
                        </div>
                }
                
                {Object.values(video).length &&
                  recommended.map((rec) => (
                    <NavLink key={rec.id} exact to={`/videos/${rec.id}`}>
                        <VideoCard key={rec.id}
                            thumb={rec.thumbnail}
                            title={rec.title.length > 50 ? `${rec.title.slice(0,50)}...`: rec.title}
                            owner={rec.User.username}
                            views={rec.views}
                            date={moment(rec.created_at).fromNow()}
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
