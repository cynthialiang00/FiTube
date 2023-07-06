import React from "react";
import PlaylistVideos from "./PlaylistVideos";
import './PlaylistSidebar.css'

const PlaylistSidebar = ({playlistTitle, playlistOwner, playlistVideosArr}) => {
    console.log(playlistVideosArr)
    return (
        <div className="video-show-playlist-wrapper">
            <div className="video-show-playlist-header">
                <div className="video-show-playlist-header-details">
                    <div id="video-show-playlist-title">
                        {playlistTitle}
                    </div>
                    <div id="video-show-playlist-owner">
                        {`${playlistOwner} - ${playlistVideosArr.length}`}
                    </div>
                </div>
                
            </div>
            <PlaylistVideos playlistVideosArr={playlistVideosArr}/>
        </div>
    )

};

export default PlaylistSidebar;
