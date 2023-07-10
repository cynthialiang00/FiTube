import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useShowPlaylistContext } from "../../context/ShowPlaylist";


function PlaylistsTab({userPlaylists}) {
    const { setCurrPlaylistId } = useShowPlaylistContext();
    const [hoverPlaylistId, setHoverPlaylistId] = useState(0);
    const userPlaylistsArr = Object.values(userPlaylists);

    const settingPlaylist = (e, playlistId) => {
        setCurrPlaylistId(playlistId);
        return;
    }

    if (!userPlaylistsArr.length) {
        return (
            <div className="no-playlists">
                This user has no playlists.
            </div>
        )
        
    }

    return (
        <>
            <div className="videos-grid">
                {userPlaylistsArr.map((playlist) => (
                    
                    <NavLink key={playlist.id} 
                            // to={{
                            //     pathname: `/videos/${playlist.video_preview.id}`,
                            //     playlistProps: {currPlaylistId: playlist.id}
                            // }}
                            to={`/videos/${playlist.video_preview.id}`}
                            className="playlist-container"
                            onMouseEnter={() => { setHoverPlaylistId(playlist.id) }}
                            onMouseLeave={() => { setHoverPlaylistId(0) }}
                            onClick={(e) => settingPlaylist(e, playlist.id)}
                    >       

                    {
                        hoverPlaylistId === playlist.id ?
                                <div id="playlist-hover-play-text">
                                    <i className="fa-sharp fa-solid fa-play" style={{color: "#f1f1f1", backgroundColor: "transparent"}}></i>
                                    {` `}PLAY ALL
                                </div>
                            :
                                null
                    }
                    
                                <div id="playlist-hover-play-length">
                                    <i className="fa-solid fa-bars" style={{ color: "#f1f1f1", backgroundColor: "transparent" }}></i>
                                    
                                    {`    ${playlist.length}`} videos
                                    
                                </div>
                        
                                <img className="video-image" src={`${playlist.video_preview.thumbnail}`} alt={`Preview of ${playlist.title}`}></img>

                                <div className="video-description">
                                    <div className="video-title">
                                        {playlist.name.length > 65 ?
                                            `${playlist.name.substring(0, 65)}...`
                                            :
                                            playlist.name
                                        }
                                    </div>
                                    <div className="video-details">
                                        <div>
                                            View full playlist
                                        </div>
                                    </div>

                                </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default PlaylistsTab;
