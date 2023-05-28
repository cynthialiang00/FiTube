import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetChannel } from "../../store/channels";


import numberFormat from "../../helperFuncs/numberFormat";


function Channel() {
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.channel.channelUser);
    const userVideos = useSelector((state) => state.channel.channelVideos);
    const userPlaylists = useSelector((state) => state.channel.channelPlaylists);

    useEffect(() => {
        dispatch(thunkGetChannel(1))
    }, [dispatch]);

    console.log("USER DETAILS: ", userDetails);
    console.log("USER VIDEOS: ", userVideos);
    console.log("USER PLAYLIST: ", userPlaylists);
    return (
        <>  
            
            <div className="channel-content-wrapper">
                Hello, welcome to my channel
            </div>
            
        </>
    );
}

export default Channel;
