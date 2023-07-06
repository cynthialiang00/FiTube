import React from "react";
import './PlaylistSidebar.css'
import PlaylistVideoCard from './PlaylistVideoCard.js';

const PlaylistVideos = ({playlistVideosArr}) => {

    return (
        <div className="video-show-playlist-videos-wrapper">
            {playlistVideosArr.map((video, index) => (
                <PlaylistVideoCard video={video} index={index} key={video.id}/>
            ))}

        </div>
    )

};

export default PlaylistVideos;
