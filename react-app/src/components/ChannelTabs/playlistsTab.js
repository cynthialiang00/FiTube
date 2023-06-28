import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";


function PlaylistsTab({userPlaylists}) {
    const [hoverPlaylistId, setHoverPlaylistId] = useState(0);
    const userPlaylistsArr = Object.values(userPlaylists);

    return (
        <>
            <div className="videos-grid">
                {userPlaylistsArr.map((playlist) => (
                    
                    <NavLink key={playlist.id} 
                            to={{
                                pathname: `/videos/${playlist.video_preview.id}`,
                                playlistProps: {showPlaylistId: playlist.id}
                            }}
                            className="playlist-container"
                            onMouseEnter={() => { setHoverPlaylistId(playlist.id) }}
                            onMouseLeave={() => { setHoverPlaylistId(0) }}
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
