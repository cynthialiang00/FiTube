import React from "react";
import PlaylistVideos from "./PlaylistVideos";
import './PlaylistSidebar.css'

const PlaylistSidebar = ({playlist, currVideoId}) => {
    // console.log('PLAYLIST SIDEBAR PLAYLIST: ', playlist)

    const playlistVideosArr = Object.values(playlist.playlist_videos);


    return (
        <div className="video-show-playlist-wrapper">
            <div className="video-show-playlist-header">
                <div className="video-show-playlist-header-details">
                    <div id="video-show-playlist-title">
                        {`${playlist.playlist_title}`}
                    </div>
                    <div id="video-show-playlist-owner">
                        {`${playlist.playlist_owner} - ${playlistVideosArr.length}`}
                    </div>
                </div>
                
            </div>
            <PlaylistVideos playlistVideosArr={playlistVideosArr} playlist={playlist} currVideoId={currVideoId}/>
        </div>
    )

};

export default PlaylistSidebar;
