import React from "react";
import './PlaylistSidebar.css'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteVideoFromPlaylist } from "../../../store/playlist";

const PlaylistVideoCard = ({video, index, currVideoId, playlist}) => {

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);


    const handleDeleteFromPlaylist = async (e, videoId) => {
        e.preventDefault();

            console.log('deleting from playlist id: ', playlist.playlist_id);
            dispatch(thunkDeleteVideoFromPlaylist(playlist.playlist_id, videoId))
                .then((res) => (res))
                .then((res) => {
                    if (res.errors) {
                        return alert(`${res.errors[0]}`);
                    }
                    else {
                        return alert('Success! Video deleted from playlist');
                    }
                })
            return;

    };

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

                {sessionUser && sessionUser.id === playlist.playlist_owner_id ?
                    <button className="video-show-playlist-video-card-delete-btn"
                        onClick={(e) => handleDeleteFromPlaylist(e, video.id)}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                :
                    null
                }
                

        </NavLink>

    )

};

export default PlaylistVideoCard;
