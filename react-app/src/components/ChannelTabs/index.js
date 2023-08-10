import React from "react";
import { useState } from "react";
import VideosTab from "./videosTab";
import PlaylistsTab from "./playlistsTab";
import AboutTab from "./aboutTab";

import './ChannelTabs.css';



function ChannelTabs({userDetails, userVideos, userPlaylists}) {
    const [activeTab, setActiveTab] = useState("videos");

    const handleVideos = (e) => {
        e.preventDefault();
        return setActiveTab("videos");
    }

    const handlePlaylists = (e) => {
        e.preventDefault();
        return setActiveTab("playlists");
    }

    const handleAbout = (e) => {
        e.preventDefault();
        return setActiveTab("about");
    }

    return (
        <div className="tabs-wrapper">
            <div className="tabs-names">
                <button className={activeTab === "videos" ? "videos-tab" : ""} onClick={handleVideos}>
                    VIDEOS
                </button>
                <button className={activeTab === "playlists" ? "playlists-tab" : ""} onClick={handlePlaylists}>
                    PLAYLISTS
                </button>
                <button className={activeTab === "about" ? "about-tab" : ""} onClick={handleAbout}>
                    ABOUT
                </button>

                <div className="tabs-divider">
                    <div className={activeTab === "videos" ?
                        "vid-slide"
                        : activeTab === "playlists" ?
                            "play-slide"
                            : activeTab === "about" ?
                                "ab-slide"
                                : "slide"}></div>
                </div>
            </div>

            
            
            <div className="tabs-content">
                {
                    activeTab === "videos" ?
                    <VideosTab userVideos={userVideos}/>
                    : activeTab === "playlists" ?
                    <PlaylistsTab userPlaylists={userPlaylists}/>
                    : activeTab === "about" ?
                    <AboutTab userDetails={userDetails}/>
                    : null

                }
            </div>
        </div>
    );
}

export default ChannelTabs;
