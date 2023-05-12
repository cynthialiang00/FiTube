import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetUserVideos } from "../../store/videos";
import OpenModalButton from "../OpenModalButton";
import DeleteVideoModal from "./DeleteVideoModal";
import UploadVideoModal from "../Navigation/UploadVideo";
import './ManageVideos.css'
import numberFormat from "../../helperFuncs/numberFormat";
import noLoginImg from '../Navigation/emoji-tongue.svg';
import noVideoImg from './upload-cloud.svg';

function ManageVideos() {
    const dispatch = useDispatch();
    const userVideos = useSelector((state) => state.videos.user_videos);
    const user = useSelector(state => state.session.user);


    useEffect(() => {
       dispatch(thunkGetUserVideos())
    }, [dispatch]);

    const userVideosArr = Object.values(userVideos);

    if (!user) return (
        <div className="manage-content">
            <div className="manage-no-login"> 
                <img className="manage-login-photo"
                    src={noLoginImg}
                    alt="not logged in"
                >
                </img>
                <div>You must <NavLink to="/login">log in</NavLink> to access this resource. </div>
            </div>

        </div>
    );

    if(!Object.values(userVideos).length) {
        return (
            <div className="manage-content">
                <div>
                    <h2>Channel content</h2>
                </div>

                <div className="upload-no-video">
                    <img className="manage-no-video-photo"
                        src={noVideoImg}
                        alt="need to upload"
                    >
                    </img>
                    <div>
                        <OpenModalButton
                            buttonText={"Upload a video"}
                            className={"upload-button"}
                            modalComponent={<UploadVideoModal />}
                        />
                        to manage your videos.
                    </div>

                </div>
            </div>
        )
    };

    return (
        userVideosArr.length ? (
        <div className="manage-content">
            <div>
                <h2>Channel content</h2>
            </div>
            <div className="manage-columns-labels">
                <div className="manage-video-label">Video</div>
                <div className="manage-edit">Edit</div>
                <div className="manage-delete">Delete</div>
                <div className="manage-date">Date</div>
                <div className="manage-views">Views</div>
                <div className="manage-comments">Comments</div>
                <div className="manage-likes">Likes (vs. dislikes)</div>
            </div>
            {userVideosArr.length && userVideosArr.map((video) => (
                <div key={video.id} className="manage-columns">
                    <div className="manage-video">
                        <img className="manage-video-img" src={video.thumbnail} alt="video thumbnail"></img>
                        {video.title.length > 46 ? 
                            <div className="manage-video-title">{`${video.title.slice(0,46)}...`}</div>
                        :
                            <div className="manage-video-title">{video.title}</div>
                        }
                        {video.description.length > 98 ?
                            <div className="manage-video-desc">{`${video.description.slice(0,98)}...`}</div>
                        :
                            <div className="manage-video-desc">{video.description}</div>
                        }
                        
                    </div>
                    <NavLink className="manage-edit" to={`/manage/edit/${video.id}`}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </NavLink>
                    <div className="manage-delete">
                        <OpenModalButton 
                            buttonText={<i className="fa-solid fa-trash-can" style={{color: '#aaaaaa'}}></i>}
                            className={"manage-delete"}
                            modalComponent={<DeleteVideoModal videoId={video.id}/>}
                        />
                    </div>
                    <div className="manage-date">
                        <div>{video.created_at}</div>
                        <div>Uploaded</div>
                    </div>
                    <div className="manage-views">
                        {
                            video.views === 0 ?
                                `No views`
                            : video.views === 1 ?
                                `${numberFormat(video.views)} view`
                            :
                                `${numberFormat(video.views)} views`
                        }
                    </div>
                    <div className="manage-comments">{video.comments_num}</div>
                    <div className="manage-likes">{video.likes_num}</div>
                </div>
            ))}
        </div>
        )
        :
        (
                <div className="manage-content">
                    <div>
                        <h2>Channel content</h2>
                    </div>
                    
                    <div className="upload-no-video">
                        <img className="manage-no-video-photo"
                            src={noVideoImg}
                            alt="need to upload"
                        >
                        </img>
                        <div>
                            <OpenModalButton
                                buttonText={"Upload a video"}
                                className={"upload-button"}
                                modalComponent={<UploadVideoModal />}
                            />
                            to manage your videos.
                        </div>
                        
                    </div>
                </div>
        )

    )
}

export default ManageVideos;
