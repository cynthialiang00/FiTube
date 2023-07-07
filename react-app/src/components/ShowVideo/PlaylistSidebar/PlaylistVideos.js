import React from "react";
import './PlaylistSidebar.css'
import PlaylistVideoCard from './PlaylistVideoCard.js';

const PlaylistVideos = ({playlistVideosArr, currVideoId}) => {
    
    return (
        <div className="video-show-playlist-videos-wrapper">
            {playlistVideosArr.map((video, index) => (
                <PlaylistVideoCard key={video.id} video={video} index={index} currVideoId={currVideoId} />
            ))}

        </div>
    )

};

export default PlaylistVideos;
